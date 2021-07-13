function initCarousel() {

  const carouselInner = document.querySelector('.carousel__inner');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');

  const widthOfSlide = carouselInner.firstElementChild.offsetWidth;
  const countOfSlides = carouselInner.children.length;
  let position = 0;

  arrowLeft.style.display = 'none'; //Изначально левая стрелка переключения не видна
  
  document.querySelector('.container').addEventListener('click', (event) => {

    if (event.target === arrowRight || event.target.parentElement === arrowRight) {
      position -= widthOfSlide;
    }
  
    if (event.target === arrowLeft || event.target.parentElement === arrowLeft) {
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
