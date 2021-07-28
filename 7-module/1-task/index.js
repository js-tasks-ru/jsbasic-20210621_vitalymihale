import createElement from '../../assets/lib/create-element.js';

//Верстка меню с классом ribbon
function menuTemplate() {
  return `<div class="ribbon">
              <button class="ribbon__arrow ribbon__arrow_left">
                  <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
              </button>
              <nav class="ribbon__inner"></nav>
              <button class="ribbon__arrow ribbon__arrow_right">
                  <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
              </button>
          </div>`;
}

//Верстка ссылки на категорию
function linkTemplate({id, name}) {
  return `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`;
}

//Класс, формирующий ленту меню
export default class RibbonMenu {

  constructor(categories) {
    this._categories = categories;
    this.elem = this._menu;
    this._scroll();
    this._selectCategory();
  }

  //Собираем меню
  get _menu() {
    const menu = createElement(menuTemplate());
    this._categories.forEach(category => {
      menu.querySelector('.ribbon__inner').insertAdjacentHTML('beforeend', linkTemplate({id: category.id, name: category.name}));
    });
    return menu;
  }

  //Реализация прокрутки меню и скрытие кнопок
  _scroll() {
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    arrowRight.classList.add('ribbon__arrow_visible'); //Первоначально видна правая стрелка

    //Прокрутка меню при нажатии на кнопки
    this.elem.addEventListener('click', (event) => {

      if (!(event.target.closest('.ribbon__arrow_right') || event.target.closest('.ribbon__arrow_left'))) {
        return;
      }

      if (event.target.closest('.ribbon__arrow_right')) {
        ribbonInner.scrollBy(350, 0);
      }

      if (event.target.closest('.ribbon__arrow_left')) {
        ribbonInner.scrollBy(-350, 0);
      }
    });

    //Скрытие кнопок в крайних положениях прокрутки
    ribbonInner.addEventListener('scroll', () => {

      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;

      if (scrollLeft < 1) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    });
  }

  //Выбор категории пользователем, добавление пользовательского события
  _selectCategory() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    //Чтобы была выделена с самого начала категория All
    const firstElement = ribbonInner.firstElementChild;
    firstElement.classList.add('ribbon__item_active');
    this.value = firstElement.dataset.id;

    this.elem.addEventListener('click', (event) => {

      if (!(event.target.tagName === "A")) return;

      event.preventDefault();
      ribbonInner.childNodes.forEach(child => {
        if (child.classList.contains('ribbon__item_active')) {
          child.classList.remove('ribbon__item_active');
        }
      });
      event.target.classList.add('ribbon__item_active');

      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {detail: event.target.dataset.id, bubbles: true}));
    });
  }
}
