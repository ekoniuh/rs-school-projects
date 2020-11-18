import { menu } from './renderContent';

function openMenu() {
  if (menu.offsetLeft === -391) {
    menu.style.left = '-125px';
    menu.classList.toggle('menu_opacity');

    document
      .querySelector('.content-box')
      .classList.toggle('content-box__scale');
  } else {
    menu.classList.toggle('menu_opacity');
    menu.style.left = '-391px';

    document
      .querySelector('.content-box')
      .classList.toggle('content-box__scale');
  }
}

export default openMenu;
