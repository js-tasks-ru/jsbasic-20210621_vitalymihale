import createElement from '../../assets/lib/create-element.js';

//Верстка кнопок переключения
function buttonsTemplate() {
  return `<div class="carousel__arrow carousel__arrow_right">
            <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
          </div>`;
}

//Верстка слайда
function slideTemplate({name, price, image, id}) {
  return `<div class="carousel__slide" data-id="${id}">
            <img src="../../assets/images/carousel/${image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
                <span class="carousel__price">€${price.toFixed(2)}</span>
                <div class="carousel__title">${name}</div>
                <button type="button" class="carousel__button">
                    <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
                </button>
            </div>
          </div>`;
}

//Создание класса, формирующего карусель с кнопками и функционалом
export default class Carousel {

  constructor(slides) {
    this._slides = slides;
    this.elem = this._carousel;
    this._switchArrows(this.elem);
    this._customEvent();
  }

  //Получить div с классом carousel__inner и слайдами
  get _carouselInner() {
    const div = createElement(`<div class="carousel__inner"></div>`);
    this._slides.forEach(slide => {
      div.insertAdjacentHTML('beforeend', slideTemplate({
        name: slide.name,
        price: slide.price,
        image: slide.image,
        id: slide.id
      }));});
    return div;
  }

  //Собираем итоговую карусель
  get _carousel() {
    const div = (createElement(`<div class="carousel">
                                ${buttonsTemplate()}
                                </div>`));
    div.append(this._carouselInner);
    return div;
  }

  //Метод реализации кнопок переключения слайдов
  _switchArrows(container) {
    const carouselInner = container.querySelector('.carousel__inner');
    const arrowLeft = container.querySelector('.carousel__arrow_left');
    const arrowRight = container.querySelector('.carousel__arrow_right');

    const countOfSlides = carouselInner.children.length;
    let position = 0;

    arrowLeft.style.display = 'none'; //Изначально левая стрелка переключения не видна

    container.addEventListener('click', (event) => {
      const widthOfSlide = container.querySelector('.carousel__inner').firstElementChild.offsetWidth;

      if (event.target.closest('.carousel__arrow_right')) {
        console.log(widthOfSlide);
        position -= widthOfSlide;
      }

      if (event.target.closest('.carousel__arrow_left')) {
        position += widthOfSlide;
      }

      if (position >= 0) {
        position = 0;
        arrowLeft.style.display = 'none';
      } else if (position <= -widthOfSlide * (countOfSlides - 1)) {
        position = -widthOfSlide * (countOfSlides - 1);
        arrowRight.style.display = 'none';
      } else {
        arrowLeft.style.display = '';
        arrowRight.style.display = '';
      }
      carouselInner.style.transform = `translateX(${position}px)`;
    });
  }

  //Создание пользовательского события при клике на кнопку +
  _customEvent() {
    this.elem.addEventListener('click', (event) => {
      if (!event.target.closest('.carousel__button')) return;
      const id = event.target.closest('.carousel__slide').dataset.id;
      this.elem.dispatchEvent(new CustomEvent('product-add', {detail: id, bubbles: true}));
    });
  }
}
