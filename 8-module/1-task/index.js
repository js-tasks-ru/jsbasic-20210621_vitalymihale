import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {

    //Проверка, что корзина появилась
    if (this.elem.offsetHeight === 0) return;

    let containerCoord = document.querySelector('.container').getBoundingClientRect();
    let leftCoord = containerCoord.right + 20;
    let windowWidth = document.documentElement.clientWidth;
    let rightCoord = windowWidth - this.elem.offsetWidth - 10;

    //Координаты точки, при прокрутке через которую корзина будет менять позиционирование
    let topCoord = this.elem.offsetTop - window.pageYOffset;

    if (windowWidth <= 767) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        right: '',
        left: '',
        zIndex: 100
      });
    } else {
      if (topCoord < 0) {
        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '50px',
          right: '10px',
          left: `${Math.min(leftCoord, rightCoord)}px`,
          zIndex: 100
        });
      } else {
        Object.assign(this.elem.style, {
          position: '',
          top: '',
          right: '',
          left: '',
          zIndex: ''
        });
      }
    }
  }
}
