import { buttonMenu, hamburgerMenu, state } from './state';

export default class Menu {
  openMenu({ target }) {
    state.isMenuOpen = !state.isMenuOpen;
    hamburgerMenu.classList.toggle('navigation_hidden');
    buttonMenu.classList.toggle('hamburger__line_active');
  }

  closeMenu() {
    hamburgerMenu.classList.toggle('navigation_hidden');
    buttonMenu.classList.toggle('hamburger__line_active');
  }
  addStyleActiveLink() {
    document
      .querySelector('.navigation__link_active')
      .classList.remove('navigation__link_active');
    document
      .querySelector(`[data-category-name='${state.nameCategory}']`)
      .classList.add('navigation__link_active');
  }
}
