//Функция создания DOM-элемента
function createElement(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}

//Верстка слайдера
function sliderTemplate({value, steps}) {
  return `<div class="slider">
            <div class="slider__thumb" style="left: ${value / (steps - 1) * 100}%;">
                <span class="slider__value">${value}</span>
            </div>
            <div class="slider__progress" style="width: ${value / (steps - 1) * 100}%;"></div>
            <div class="slider__steps"></div>
          </div>`;
}

//Класс, формирующий слайдер
export default class StepSlider {

  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;
    this.elem = this._slider;
    this._event();
  }

  //Сборка слайдера
  get _slider() {
    const slider = createElement(sliderTemplate({value: this._value, steps: this._steps}));
    for (let i = 0; i < this._steps; i++) {
      const span = createElement(`<span></span>`);
      if (i === this._value) {
        span.classList.add('slider__step-active');
      }
      slider.querySelector('.slider__steps').append(span);
    }
    return slider;
  }

  //Переключение слайдера и создание пользовательского события
  _event() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const sliderValue = this.elem.querySelector('.slider__value');

    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let value = Math.round(leftRelative * (this._steps - 1));
      let leftPercents = value / (this._steps - 1) * 100;

      //Добавление класса span'у слайдера
      this.elem.querySelector('.slider__steps').childNodes.forEach((slide, index) => {
        if (slide.classList.contains('slider__step-active')) {
          slide.classList.remove('slider__step-active');
        }
        if (index === value) {
          slide.classList.add('slider__step-active');
        }
      });

      sliderValue.textContent = `${value}`;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      //Добавление пользовательского события
      this.elem.dispatchEvent(new CustomEvent('slider-change', {detail: value, bubbles: true}));
    });
  }
}
