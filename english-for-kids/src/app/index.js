import '../styles/style.scss';
import {
  buttonMenu,
  categoryContainer,
  navigation,
  logo,
  answersContainer,
  startButton,
  repeatButton,
  mainPage,
  state,
  statisticButton,
} from './state';
import { Menu } from './menu';
import Card from './cards';
import Game from './game';
import gameState from './gameState';
import { showMainPage, toStatisticPage, removeStatistic } from './utils';

const card = new Card();
const menu = new Menu();
const game = new Game();

categoryContainer.addEventListener('click', (event) => card.renderCards(event));
buttonMenu.addEventListener('click', (event) => menu.openMenu(event));
navigation.addEventListener('click', (event) => {
  card.removeContainerCards(event);
  removeStatistic();
  card.renderCards(event);
  menu.closeMenu();
});

logo.addEventListener('click', () => showMainPage(card));

//FIXME: переименовать класс
mainPage.addEventListener('click', (event) => {
  event.stopPropagation();
  showMainPage(card);
  menu.closeMenu();
});

statisticButton.addEventListener('click', (event) => {
  event.stopPropagation();
  state.isClickStatistic = true;
  card.removeContainerCards(event);
  toStatisticPage(card, gameState);
  menu.closeMenu();
});

document.querySelector('.switch__input').addEventListener('change', () => {
  state.isModeGame = !state.isModeGame;
  state.isClickStart = false;
  document.querySelector('.switch__slider').textContent = !state.isModeGame
    ? 'Train'
    : 'Play';

  if (state.isMainPage) {
    return;
  }
  card.removeAnswers();
  card.hideTitleCards();
  answersContainer.classList.toggle('answers_none');
  startButton.classList.remove('start-game__btn_none');
  repeatButton.classList.add('repeat__btn_none');
});

startButton.addEventListener('click', () => {
  state.isClickStart = true;
  game.startGame();
  // card.hideStartButton();
  startButton.classList.add('start-game__btn_none');
  repeatButton.classList.remove('repeat__btn_none');
});

repeatButton.addEventListener('click', () => {
  game.startGame();
});

// document.querySelector('.repeat-button').addEventListener('click', (event) => {
//   event.stopPropagation();
// });
// document.querySelector('.repeat-button').addEventListener('click', () => {});
