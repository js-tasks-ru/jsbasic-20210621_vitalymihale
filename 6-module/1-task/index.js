/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

//Верстка шапки таблицы
function headerTemplate() {
  return `<thead>
              <tr>
                  <th>Имя</th>
                  <th>Возраст</th>
                  <th>Зарплата</th>
                  <th>Город</th>
                  <th></th>
              </tr>
          </thead>`;
}

//Верстка строки таблицы
function rowTemplate(row) { //верстка строки
  return `<tr>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.salary}</td>
            <td>${row.city}</td>
            <td><button>X</button></td>
          </tr>`;
}

//Класс, формирующий итоговую таблицу
export default class UserTable {

  constructor(rows) {
    this._rows = rows;
    this.elem = this._table;
    this._removeRow();
  }

  //Таблица с шапкой и строками
  get _table() {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.insertAdjacentHTML('afterbegin', headerTemplate());
    this._rows.forEach(row => {
      tbody.insertAdjacentHTML('beforeend', rowTemplate(row))
    });
    table.append(tbody);
    return table;
  }

  //Обработчик события нажатия кнопки (удаление строки)
  _removeRow() {
    this.elem.querySelector('tbody').childNodes.forEach(child => {
      child.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          event.target.closest('tr').remove();
        }
      }, {once: true});});
  }
}
