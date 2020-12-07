export const buttonMenu = document.querySelector('.hamburger');
export const hamburgerMenu = document.querySelector('.navigation');
export const categoryContainer = document.querySelector('.category');
export const navigation = document.querySelector('.navigation');
export const logo = document.querySelector('.logo-title');
export const answersContainer = document.querySelector('.answers');
export const startButton = document.querySelector('.start-game__btn');
export const repeatButton = document.querySelector('.repeat__btn');
export const mainPage = document.querySelector('.main-page');

// export let isMenuOpen = false;
export const state = {
  isMainPage: true,
  isTrain: true,
  isMenuOpen: false,
  isClickStart: false,
  isCardRotate: false,
  nameCategory: '',
  currentCard: 0,
  isModeGame: false,
  isModeGame: false,
  wordGameArray: [],
  cardCategoryArray: [],
  errors: 0,
  endGame: false,
};
