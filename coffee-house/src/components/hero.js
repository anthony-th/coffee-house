import { createElement } from "../common/createElement";

export const heroSection = createElement('section', ['section', 'hero-section']);
const heroVideoAutoPlay = createElement('video', ['hero-video']);
heroVideoAutoPlay.autoplay = true;
heroVideoAutoPlay.loop = true;
heroVideoAutoPlay.muted = true;
heroVideoAutoPlay.controls = false;
heroVideoAutoPlay.controlslist = 'nodownload';
heroVideoAutoPlay.poster = './assets/img/img-hero.webp';
const videoSource = createElement('source', [], '', { src: './assets/videos/video-2160p.webm', type: 'video/webm' });
const heroContent = createElement('div', ['hero-block']);
const heroTitle = createElement('h1', ['hero-title'], `<span class="italic-accent">Enjoy</span> premium coffee at our charming cafe`, {}, true);
const heroSubtitle = createElement('p', ['hero-text'], 'With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage.');
heroSubtitle.textContent = 'With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage.';
const heroButton = createElement('a', ['hero-btn', 'cursor-pointer'], '<span>Menu</span>', { href: './menu.html' }, true);

heroContent.append(heroTitle, heroSubtitle, heroButton);
heroVideoAutoPlay.append(videoSource);
heroSection.append(heroVideoAutoPlay);
heroSection.append(heroContent);