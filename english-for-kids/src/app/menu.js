import { buttonMenu, hamburgerMenu, state } from './state';
// import moduleName from './state';

export class Menu {
  // constructor() {

  // }
  openMenu({ target }) {
    // if (!state.isMenuOpen) {
    // if (target.classList.contains('hamburger') && !state.isMenuOpen) {
    state.isMenuOpen = !state.isMenuOpen;
    hamburgerMenu.classList.toggle('navigation_hidden');
    buttonMenu.classList.toggle('hamburger__line_active');
    // }
    // const div = document.createElement('div');
    // div.className = 'nav-box';
    // document.querySelector('.nav-box').toggle('nav-box_none');
    // }
    // state.isMenuOpen = !isModeGame;
  }

  // target.closest('.navigation__link') ||
  // target.closest('.header__hamburger') ||
  closeMenu() {
    // if (state.isMenuOpen) {
    //   if (!target.classList.contains('navigation')) {
    hamburgerMenu.classList.toggle('navigation_hidden');
    buttonMenu.classList.toggle('hamburger__line_active');
    //     }
    //   }

    //   // if (!target.closest('.navigation') ) {
    //   // }
  }
}
