import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product === null || !product) return;
    let array = [];

    this.cartItems.forEach(item => {
      if (item.product.name === product.name) {
        item.count++;
        this.onProductUpdate(item);
        array.push(item);
      }
    });

    if (!array.length) {
      this.cartItems.push({product: product, count: 1});
      this.onProductUpdate({product: product, count: 1});
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        if (amount === 1) {
          item.count++;
        } else if (amount === -1) {
          item.count--;
        }
        if (item.count === 0) {
          this.cartItems.splice(index, 1);
        }
      }
      this.onProductUpdate(item);
    });
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="../../assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="../../assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="../../assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this._modal = new Modal();
    this._modal.setTitle('Your order');
    const modalBody = createElement('<div></div>');
    this.cartItems.forEach(item => {
      modalBody.append(this.renderProduct(item.product, item.count));
    });
    modalBody.append(this.renderOrderForm());
    this._modal.setBody(modalBody);
    this._modal.open();

    //Реализация уменьшения и увеличения количества товара в модальном окне
    modalBody.addEventListener('click', (event) => {
      if (!event.target.closest('.cart-counter__button')) return;
      let productId = event.target.closest('.cart-product').dataset.productId;

      if (event.target.closest('.cart-counter__button_plus')) {
        this.updateProductCount(productId, 1);
      }

      if (event.target.closest('.cart-counter__button_minus')) {
        this.updateProductCount(productId, -1);
      }
    });

    modalBody.querySelector('.cart-form').addEventListener('submit', (event) => {
      this.onSubmit(event);
    }, {once: true});
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      //Убрать верстку продукта из модального окна, если его count стал равен 0
      if (cartItem.count === 0 && !this.isEmpty()) {
        document.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
      } else if (this.isEmpty()) {
        this._modal.close();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    event.target.querySelector('.btn-group__button').classList.add('is-loading');

    //Сделать иконку корзинки невидимой после того, как была отправлена форма (оставалась видимой)
    this.cartIcon.elem.classList.remove('cart-icon_visible');
    const formData = new FormData(event.target);

    const responsePromise = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST'
    });

    responsePromise
      .then(() => {
        this._modal.setTitle('Success!');
        this.cartItems.length = 0;
        this._modal.setBody(createElement(`<div class="modal__body-inner">
                                                                  <p>
                                                                    Order successful! Your order is being cooked :) <br>
                                                                    We’ll notify you about delivery time shortly.<br>
                                                                    <img src="../../assets/images/delivery.gif">
                                                                  </p>
                                                                </div>`));
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

