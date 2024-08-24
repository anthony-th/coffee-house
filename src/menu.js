import './styles/main.scss';

import { header, menu, menuCopy, itemLink1, itemLink2, itemLink3 } from './components/header';
import { menuMain } from './components/menu-main';
import { footer } from './components/footer';

itemLink1.href = './index.html#favorite';
itemLink2.href = './index.html#about';
itemLink3.href = './index.html#mobileapp';
menu.href = '#no_scroll';
menuCopy.href = '#no_scroll';
menu.style.cursor = 'default';
menuCopy.style.cursor = 'default';
menu.classList.add('link-active');
menuCopy.classList.add('link-active');
document.body.append(header, menuMain, footer);