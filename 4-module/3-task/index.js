function highlight(table) {
  const tbody = table.querySelector('tbody')
  for (let row of tbody.rows) {
    if (row.lastElementChild.dataset.available === 'true') {
      row.classList.add('available');
    } else if (row.lastElementChild.dataset.available === 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }

    row.cells[2].textContent === 'm' ? row.classList.add('male') : row.classList.add('female')

    if (+row.cells[1].textContent < 18) {
      row.style.textDecoration = 'line-through'
    }
  }
}
