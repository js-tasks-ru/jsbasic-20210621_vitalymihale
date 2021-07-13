function hideSelf() {
  document.querySelector('.hide-self-button').addEventListener('click', (event) => {
      event.target.hidden = true;
  }, {once: true})
}
