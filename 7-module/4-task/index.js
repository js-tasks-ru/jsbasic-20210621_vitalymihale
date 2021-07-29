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
  constructor({ steps, value}) {
    this._steps = steps;
    this.value = value;
    this.elem = this._slider;
    this._dragAndDrop();
  }

  //Сборка слайдера
  get _slider() {
    const slider = createElement(sliderTemplate({value: this.value, steps: this._steps}));
    for (let i = 0; i < this._steps; i++) {
      const span = createElement(`<span></span>`);
      if (i === this.value) {
        span.classList.add('slider__step-active');
      }
      slider.querySelector('.slider__steps').append(span);
    }
    return slider;
  }

  //Реализация Drag-n-Drop
  _dragAndDrop() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const sliderValue = this.elem.querySelector('.slider__value');

    //Отключаем браузерный Drag-and-Drop
    thumb.ondragstart = () => false;

    const onClick = (event) => {
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
    };

    this.elem.addEventListener('click', onClick);

    thumb.addEventListener('pointerdown', () => {
      //Убираем событие onclick
      this.elem.removeEventListener('click', onClick);
      this.elem.classList.add('slider_dragging');
      thumb.style.position = 'absolute';

      const onMove = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
        if (leftRelative < 0) {
          leftRelative = 0;
        } else if (leftRelative > 1) {
          leftRelative = 1;
        }
        let value = Math.round(leftRelative * (this._steps - 1));

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
        thumb.style.left = `${leftRelative * 100}%`;
        progress.style.width = `${leftRelative * 100}%`;
      };

      document.addEventListener('pointermove', onMove);

      document.addEventListener('pointerup', (event) => {
        document.removeEventListener('pointermove', onMove);
        this.elem.classList.remove('slider_dragging');
        onClick(event);

        //Возвращаем событие onclick
        this.elem.addEventListener('click', onClick);
      }, {once: true});
    });
  }
}
