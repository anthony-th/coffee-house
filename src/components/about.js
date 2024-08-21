import { createElement } from "../common/createElement";

export const aboutSection = createElement('section', ['section', 'about-section'], '', { id: 'about'});
const aboutTitle = createElement('h2', ['title'], `Resource is <span class="italic-accent">the perfect and cozy place</span> where you can enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.`, {}, true);
const aboutGalery = createElement('div', ['about-block']);

const srcImages = [
  './assets/img/about/about-1.webp',
  './assets/img/about/about-2.webp',
  './assets/img/about/about-3.webp',
  './assets/img/about/about-4.webp'
];

srcImages.forEach(src => {
  const imgWrapper = createElement('div', ['img-wrapper']);
  const image = createElement('img', ['about-img'], '', { src, alt: ''});
  imgWrapper.append(image);
  aboutGalery.append(imgWrapper);
});

aboutSection.append(aboutTitle, aboutGalery);