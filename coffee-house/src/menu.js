import './styles/main.scss';

import { header, menu, itemLink1, itemLink2, itemLink3 } from './components/header';
import { menuMain } from './components/menu-main';
import { footer } from './components/footer';

itemLink1.href = './index.html#favorite';
itemLink2.href = './index.html#about';
itemLink3.href = './index.html#mobileapp';
menu.style.pointerEvents = 'none';
menu.href = 'none';
document.body.append(header, menuMain, footer);