export const buttonMenu = document.querySelector('.hamburger');
export const hamburgerMenu = document.querySelector('.navigation');
export const categoryContainer = document.querySelector('.category');

// export let isMenuOpen = false;
export const state = {
  isMenuOpen: false,
  isClickStart: false,
  nameCategory: '', // на какой странице нахожусь
  currentCard: 0, // текущая карточка
  isModeGame: false, // активирован ли режим игры
  isModeGame: false, // началась ли игра
  wordGameArray: [], //
  cardCategoryArray: [],
  errors: 0, // количество ошибок
  endGame: false,
  // заончилась ли игра
};
// export { buttonMenu, hamburgerMenu, card, isMenuOpen };
