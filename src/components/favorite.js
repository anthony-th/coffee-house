import { createElement } from '../common/createElement';
import sliderJson from '../data/slider.json';

export const favoriteSection = createElement('section', ['section', 'favorite-section'], '', { id: 'favorite'});
const favoriteTitle = createElement('h2', ['title'], `Choose your <span class="italic-accent">favorite</span> coffee`, {}, true);
const favoriteSliderWrapper = createElement('div', ['slider-block']);
const favoriteArrowLeft = createElement('a', ['arrow', 'cursor-pointer']);
const arrowLeftIcon = createElement('svg', [], `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M18.5 12H6M6 12L12 6M6 12L12 18" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`, {}, true);
const favoriteSliders = createElement('div', ['sliders']);

const totalSliders = sliderJson.length;
const allSliders = [];
let startSlider = 0;
let autoScrollInterval;
let pause = false;
let intervalTime = 6900;
let mouseOverTime = 0;
let pauseInterval = 0;
let pauseStopInterval;
let touchFingerStart = 0;
let touchFingerEnd = 0;

sliderJson.forEach((item) => {
  const favoriteSlider = createElement('div', ['slider']);
  const sliderImg = createElement('img', ['slider-img', 'user-select-none'], '', { src: item.img, alt: '' });
  const favoriteTextBlock = createElement('div', ['slider-textblock']);
  const favoriteSliderTitle = createElement('h2', ['slider-title', 'user-select-none'], item.name);
  const favoriteSliderText = createElement('p', ['slider-text', 'user-select-none'], item.description);
  const favoriteSliderPrice = createElement('p', ['slider-text', 'user-select-none'], `$${item.price}`);

  favoriteTextBlock.append(favoriteSliderTitle, favoriteSliderText, favoriteSliderPrice);
  favoriteSlider.append(sliderImg, favoriteTextBlock);
  favoriteSliders.append(favoriteSlider);

  favoriteSlider.onmouseenter = slidersMouseOver;
  favoriteSlider.onmouseleave = slidersMouseOut;

  allSliders.push(favoriteSlider);
});

const favoriteArrowRight = createElement('a', ['arrow', 'cursor-pointer']);
const arrowRightIcon = createElement('svg', [], `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`, {}, true);

const sliderProgressBar = createElement('div', ['slider-progressbar']);
const progressLines = Array.from({ length: totalSliders }, (_, index) => {
  const line = createElement('span', ['progressbar-line']);
  if (index === 0) line.classList.add('active-progress-line');
  sliderProgressBar.append(line);
  return line;
});

function autoScrollX() {
  autoScrollInterval = setInterval(nextSlide, intervalTime);
  pauseInterval = new Date().getTime();
}

function slidersMouseOver() {
  clearInterval(autoScrollInterval);
  pause = true;
  progressLines.forEach(line => line.classList.add('pause')); 
  mouseOverTime = new Date().getTime();
  pauseStopInterval = mouseOverTime - pauseInterval;
  intervalTime -= pauseStopInterval;
}

function slidersMouseOut() {
  if (pause === true) {
    autoScrollX();
    pause = false;
    progressLines.forEach(line => line.classList.remove('pause'));
  }
}

function updateLinesStatus() {
  progressLines.forEach((line, index) => {
    line.classList.toggle('active-progress-line', index === startSlider);
  });
}

function currentSlide(index) {
  const translateX = `translateX(${-100 * index}%)`;
  allSliders.forEach(slider => slider.style.transform = translateX);
}

function nextSlide() {
  clearInterval(autoScrollInterval);
  intervalTime = 6900;
  autoScrollX();
  startSlider = (startSlider + 1) % totalSliders;
  currentSlide(startSlider);
  updateLinesStatus();
}

function prevSlide() {
  clearInterval(autoScrollInterval);
  intervalTime = 6900;
  autoScrollX();
  startSlider = (startSlider - 1 + totalSliders) % totalSliders;
  currentSlide(startSlider);
  updateLinesStatus();
}

function touchStart(e) {
  e.preventDefault();
  touchFingerStart = e.touches[0].clientX;
  slidersMouseOver();
}

function touchMove(e) {
  touchFingerEnd = e.touches[0].clientX;
}

function touchEnd(e) {
  e.preventDefault();
  slidersMouseOut();
  swipe();
}

function swipe() {
  if (touchFingerStart && touchFingerEnd) {
    const direction = touchFingerStart - touchFingerEnd;
    if (Math.abs(direction) >= 100) {
      direction > 0 ? nextSlide() : prevSlide();
    }
  }
  touchFingerStart = 0;
  touchFingerEnd = 0;
}

favoriteSliders.addEventListener('touchstart', touchStart);
favoriteSliders.addEventListener('touchmove', touchMove);
favoriteSliders.addEventListener('touchend', touchEnd);
favoriteSliders.addEventListener('touchcancel', slidersMouseOut);

window.onload = autoScrollX;

favoriteArrowLeft.onclick = prevSlide;
favoriteArrowRight.onclick = nextSlide;

favoriteArrowLeft.append(arrowLeftIcon);
favoriteArrowRight.append(arrowRightIcon);
favoriteSliderWrapper.append(favoriteArrowLeft, favoriteSliders, favoriteArrowRight);
favoriteSection.append(favoriteTitle, favoriteSliderWrapper, sliderProgressBar);