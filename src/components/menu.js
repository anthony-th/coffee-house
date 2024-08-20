import { createElement } from '../common/createElement';
import dataProductsJson from '../data/products.json';
import { checkWidth, menu } from './header';

export const menuSection = createElement('section', ['section', 'menu-section']);
const manuTabs = createElement('div', ['menu-tabs']);
const manuTitle = createElement('h1', ['title'], `Behind each of our cups hides an <span class="italic-accent">amazing surprise</span>`, {}, true);
const tabsList = createElement('div', ['tabs-list']);

const categories = [
  { name: 'Coffee', icon: './assets/img/cof.png', filter: 'coffee' },
  { name: 'Tea', icon: './assets/img/tee.png', filter: 'tea' },
  { name: 'Dessert', icon: './assets/img/chees.png', filter: 'dessert' }
];

let activeTab = null;

categories.forEach((category, index) => {
  const tabLink = createElement('a', ['tabs-link', 'user-select-none']);
  if (index === 0) {
    tabLink.classList.add('tab-active');
    activeTab = tabLink;
  }
  const tabIconBlock = createElement('div', ['link-block']);
  const tabIcon = createElement('img', ['link-icon'], '', { src: category.icon, alt: '' });
  const tabText = createElement('p', ['link-text'], category.name);
  
  tabIconBlock.append(tabIcon);
  tabLink.append(tabIconBlock, tabText);
  tabsList.append(tabLink);

  tabLink.onclick = () => {
    if (activeTab) {
      activeTab.classList.remove('tab-active');
    }
    tabLink.classList.add('tab-active');
    activeTab = tabLink;
    filterProducts(category.filter);
    checkInnerWidthForTabReload();
    showCards();
  };
});

const manuList = createElement('div', ['menu-list']); 

let initialQuantityProducts;
const cardVisible = [];
let visibleCardsCount = window.innerWidth <= 768 ? 4 : 8; 

function filterProducts(category) {
  cardVisible.length = 0;
  manuList.innerHTML = '';
  const filteredProducts = dataProductsJson.filter(el => el.category === category);
  initialQuantityProducts = filteredProducts.length;

  filteredProducts.forEach(item => {
    const menuListItem = createMenuItem(item);
    manuList.append(menuListItem);
    cardVisible.push(menuListItem);
  });
}

function createMenuItem(item) {
  const menuListItem = createElement('div', ['card', 'cursor-pointer']);
  const listImgWrapper = createElement('div', ['item-wrapper']);
  const listItemImg = createElement('img', ['item-img'], '', { src: item.img, alt: '' });
  const listTextWrapper = createElement('div', ['text-wrapper']);
  const listItemTitle = createElement('h3', ['item-title'], item.name);
  const listItemText = createElement('p', ['item-text'], item.description);
  const listItemPrice = createElement('h4', ['item-price'], `$${item.price}`);

  listTextWrapper.append(listItemTitle, listItemText, listItemPrice);
  listImgWrapper.append(listItemImg);
  menuListItem.append(listImgWrapper, listTextWrapper);

  menuListItem.onclick = () => openModal(item);

  return menuListItem;
}

const tabsReload = createElement('div', ['tabs-reload', 'cursor-pointer']);
const svgReload =  createElement('svg', [], `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`, {}, true);

tabsReload.onclick = tabsReloadRotate;

function tabsReloadRotate() {
  svgReload.classList.add('rotate360');
}

tabsReload.addEventListener('animationend', () => {
  svgReload.classList.remove('rotate360');
    if (visibleCardsCount < initialQuantityProducts) {
    cardVisible.forEach((card) => {
      card.style.display = 'flex';
      tabsReload.style.display = 'none';
    });
  }
});

function showCards() {
  cardVisible.forEach((card, index) => {
    card.style.display = index < visibleCardsCount ? 'flex' : 'none';
  });
}

function checkInnerWidthForTabReload() {
  const isSmallScreen = window.innerWidth <= 768;
  visibleCardsCount = isSmallScreen ? 4 : 8;
  tabsReload.style.display = isSmallScreen && initialQuantityProducts > 4 ? 'flex' : 'none';
  showCards();
}

function resizeWin() {
  checkWidth();
  checkInnerWidthForTabReload();
  menu.className = 'menu link-active';
}

filterProducts('coffee');
checkInnerWidthForTabReload();

window.onresize = resizeWin;

function openModal(item) {
  const shadow = createElement('div', ['modal-shadow']);
  const modal = createElement('div', ['modal']);
  const blockImage = createElement("div", ["modal-image-block"]);
  const modalImage = createElement("img", ["modal-image"], '', { src: item.img });
  const blockText = createElement("div", ["modal-text-block"]);
  const titleBlock = createElement("div", ["title-block"]);
  const title = createElement("h2", ["title-modal"], item.name);
  const subTitle = createElement("p", ["modal-description"], item.description);
  const sizeBlock = createElement("div", ["size-block"]);
  const sizeTitle = createElement("p", ["size-title"], 'Size');
  const sizeButtons = createElement("div", ["size-buttons"]);

  const sizes = [
    { label: 'S', addprice: item.sizes.s.addprice, size: item.sizes.s.size },
    { label: 'M', addprice: item.sizes.m.addprice, size: item.sizes.m.size },
    { label: 'L', addprice: item.sizes.l.addprice, size: item.sizes.l.size }
  ];
  
  let selectSize = sizes[0].addprice;
  let activeSizeButton = null;
  
  sizes.forEach((size, index) => {
    const sizeButton = createElement('div', ['size-button', 'user-select-none']);
    if (index === 0) {
      sizeButton.classList.add('size-button-active');
      activeSizeButton = sizeButton;
    }
    const sizeCircle = createElement('div', ['size-circle'], size.label);
    const sizeText = createElement('p', ['size-ml'], size.size);
    
    sizeButton.append(sizeCircle, sizeText);
    sizeButtons.append(sizeButton);

    sizeButton.onclick = () => {
      if (activeSizeButton) {
        activeSizeButton.classList.remove('size-button-active');
      }
      sizeButton.classList.add('size-button-active');
      activeSizeButton = sizeButton;
      selectSize = size.addprice;
      updateTotalPrice();
    };
  });

  const additives = createElement("div", ["additives"]);
  const additivesTitle = createElement("p", ['additives-title'], 'Additives');
  const additivesButtons = createElement("div", ["additives-buttons"]);

  const additivesData = [
    { label: '1', name: item.additives[0].name },
    { label: '2', name: item.additives[1].name },
    { label: '3', name: item.additives[2].name }
  ];

  const additivesButtonsArr = [];

  additivesData.forEach((additive) => {
    const additivesButton = createElement("div", ["additives-button", 'user-select-none']);
    const additivesCircle = createElement("div", ['additives-circle'], additive.label);
    const additivesText = createElement("p", ['additives-elements'], additive.name);

    additivesButton.append(additivesCircle, additivesText);
    additivesButtons.append(additivesButton);
    additivesButtonsArr.push(additivesButton);

    additivesButton.onclick = () => {
      additivesButton.classList.toggle('additives-button-active');
      updateSelectAdd();
    };
  })

  document.body.classList.add('overflow-hidden');

  const totalBlock = createElement("div", ["total-block"]);
  const totalText = createElement("p", ["total-text"], 'Total:');
  const totalPrice = createElement("p", ["total-price"]);
  const alertBlock = createElement("div", ["alert-block"]);
  const alertSvg = createElement("svg", [], `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_268_12877)">
    <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_268_12877">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
  </svg>`, {}, true);
  const alertTitle = createElement("p", ["alert-title"], 'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.');
  const closeButton = createElement("button", ['button-close'], 'Close');

  closeButton.onclick = closeModal;
  shadow.onclick = closeModal;

  function closeModal() {
    modal.remove();
    shadow.remove();
    document.body.classList.remove('overflow-hidden');
  }

  let selectAddPrice = null;

  additives.append(additivesTitle, additivesButtons);
  sizeBlock.append(sizeTitle, sizeButtons);
  titleBlock.append(title, subTitle);
  totalBlock.append(totalText, totalPrice);
  alertBlock.append(alertSvg, alertTitle);

  let selectAddArray = [];

  function updateSelectAdd() {
    selectAddArray = [];
    additivesButtonsArr.forEach((button, index) => {
      if (button.classList.contains('additives-button-active')) {
        selectAddArray.push(item.additives[index]);
      }
    });
    updateTotalPrice();
  }

  totalPrice.textContent = `$${(Number(item.price) + Number(selectSize) + Number(selectAddPrice)).toFixed(2)}`;

  function calculateTotalPrice(item, selectSize, selectAddPrice) {
    return (Number(item.price) + Number(selectSize) + Number(selectAddPrice)).toFixed(2);
  }

  function updateTotalPrice() {
    let totalAddPrice = 0;
    selectAddArray.forEach((el) => {
      totalAddPrice += Number(el.addprice);
    });
    totalPrice.textContent = `$${calculateTotalPrice(item, selectSize, totalAddPrice)}`;
  }

  window.onresize = function() {
    closeModal();
  };

  blockText.append(titleBlock, sizeBlock, additives, totalBlock, alertBlock, closeButton);
  modal.append(blockImage, blockText);
  blockImage.append(modalImage);
  manuList.append(shadow, modal);  
}

tabsReload.append(svgReload);
manuTabs.append(manuTitle, tabsList);
menuSection.append(manuTabs, manuList, tabsReload);