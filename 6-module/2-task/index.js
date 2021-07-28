import createElement from '../../assets/lib/create-element.js';

//Верстка внутреннего div с классом card__top
function divTemplate({image, price, name}) {
  return `<div class="card__top">
            <img src="../../assets/images/products/${image}" class="card__image" alt="product">
            <span class="card__price">€${price.toFixed(2)}</span>
          </div>
            <div class="card__body">
                <div class="card__title">${name}</div>
                    <button type="button" class="card__button">
                    <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
                    </button>
            </div>
          </div>`;
}

//Создание класса, формирующего карточку товара
export default class ProductCard {

  constructor(product) {
    this._name = product.name;
    this._price = product.price;
    this._category = product.category;
    this._image = product.image;
    this._id = product.id;

    this.elem = this._card;
    this._getEvent();
  }

  //Возвращается div карточки товара
  get _card() {
    return createElement(`<div class="card">
                                ${divTemplate({image: this._image, price: this._price, name: this._name})}
                               </div>`);
  }

  //Создает пользовательское событие при нажатии на кнопку +
  _getEvent() {
    this.elem.addEventListener('click', (event) => {
      if (!event.target.closest('.card__button')) return;
      this.elem.dispatchEvent(new CustomEvent('product-add', {detail: this._id, bubbles: true}));});
  }
}
