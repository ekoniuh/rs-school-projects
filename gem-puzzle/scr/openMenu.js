import { menu } from './renderContent';
import state from './state';

function openMenu() {
  if (menu.offsetLeft === state.OFFSET_MENU_HIDDEN) {
    menu.classList.toggle('menu_opacity');
    document
      .querySelector('.content-box')
      .classList.toggle('content-box__scale');
  } else {
    menu.classList.toggle('menu_opacity');
    document
      .querySelector('.content-box')
      .classList.toggle('content-box__scale');
  }
}

export default openMenu;
