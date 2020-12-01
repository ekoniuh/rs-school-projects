export const buttonMenu = document.querySelector('.hamburger');
export const hamburgerMenu = document.querySelector('.navigation');
export const card = document.querySelector('.cards');

// export let isMenuOpen = false;
export const state = {
  isMenuOpen: false,
  page: 0, // на какой странице нахожусь
  currentCard: 0, // текущая карточка
  play: false, // активирован ли режим игры
  playActive: false, // началась ли игра
  randomArr: [], //
  errors: 0, // количество ошибок
	endGame: false, // заончилась ли игра
	
};
// export { buttonMenu, hamburgerMenu, card, isMenuOpen };
