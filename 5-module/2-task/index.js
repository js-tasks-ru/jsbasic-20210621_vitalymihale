function toggleText() {
  const div = document.getElementById('text')
  document.querySelector('.toggle-text-button').addEventListener('click', () => {
    div.hidden = !div.hidden
  });
}
