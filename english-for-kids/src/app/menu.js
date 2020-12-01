import { buttonMenu, hamburgerMenu, state } from './state';
// import moduleName from './state';

export class Menu {
  // constructor() {

  // }
  openMenu(asdas) {
    state.isMenuOpen = !asdas;
    hamburgerMenu.classList.toggle('navigation_hidden');
    buttonMenu.classList.toggle('hamburger__line_active');
  }

  // target.closest('.navigation__link') ||
  // target.closest('.header__hamburger') ||
  closeMenu({ target }) {
    if (!target.closest('.navigation') ) {
      hamburgerMenu.classList.toggle('navigation_hidden');
      buttonMenu.classList.toggle('hamburger__line_active');
    }
  }
}
