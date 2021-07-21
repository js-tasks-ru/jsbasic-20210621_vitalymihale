import createElement from '../../assets/lib/create-element.js';

//Верстка модального окна
function modalTemplate() {
  return createElement(`<div class="modal">
            <div class="modal__overlay"></div>
            <div class="modal__inner">
                <div class="modal__header">

                    <button type="button" class="modal__close">
                        <img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />
                    </button>

                    <h3 class="modal__title"></h3>
                    <div class="modal__body"></div>
                </div>
            </div>
          </div>`);
}

//Класс, формирующий модальное окно
export default class Modal {

  constructor() {
    this._modal = modalTemplate();
    this._closeButton();
    this._escButton();
  }

  //Заголовок модального окна
  setTitle(title) {
    this._modal.querySelector('.modal__title').textContent = title;
  }

  //Тело модального окна
  setBody(element) {
    this._modal.querySelector('.modal__body').append(element);
  }

  //Открытие модального окна: добавление модального окна на страницу в body
  open() {
    document.body.append(this._modal);
    document.body.classList.add('is-modal-open');
  }

  //Удаление модального окна при вызове этого метода
  close() {
    this._modal.remove();
    document.body.classList.remove('is-modal-open');
  }

  //Реализация кнопки закрытия модального окна
  _closeButton() {
    this._modal.querySelector('.modal__close').addEventListener('click', () => {
      this._modal.remove();
      document.body.classList.remove('is-modal-open');
    }, {once: true});
  }

  //Реализация закрытия окна при нажатии кнопки ESC
  _escButton() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this._modal.remove();
        document.body.classList.remove('is-modal-open');
      }
    });
  }
}
