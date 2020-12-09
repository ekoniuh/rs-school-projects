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
import Menu from './menu';
import Card from './cards';
import Game from './game';
import gameState from './gameState';
import {
  showMainPage,
  toStatisticPage,
  removeStatistic,
  changeSwitchButton,
} from './utils';

const card = new Card();
const game = new Game();
const menu = new Menu();

state.hash = 'main-page';
card.setLocationHash(state.hash);

categoryContainer.addEventListener('click', (event) => card.renderCards(event));

buttonMenu.addEventListener('click', (event) => menu.openMenu(event));

navigation.addEventListener('click', (event) => {
  card.removeContainerCards(event);
  removeStatistic();
  repeatButton.classList.add('repeat__btn_none');
  card.renderCards(event);
  menu.closeMenu();
});

logo.addEventListener('click', () => showMainPage(card));

mainPage.addEventListener('click', (event) => {
  event.stopPropagation();
  // state.isClickStatistic = true;
  state.hash = event.target.dataset.hash;
  card.setLocationHash(state.hash);
  showMainPage(card);
  menu.closeMenu();
});

statisticButton.addEventListener('click', (event) => {
  event.stopPropagation();
  state.isMainPage = true;
  // state.isClickStatistic = true;
  state.hash = event.target.dataset.hash;
  card.setLocationHash(state.hash);
  card.removeContainerCards(event);
  toStatisticPage(card, gameState);
  menu.closeMenu();
});

document.querySelector('.switch__input').addEventListener('change', () => {
  changeSwitchButton(state, card);
});

startButton.addEventListener('click', () => {
  state.isClickStart = true;
  game.startGame();

  startButton.classList.add('start-game__btn_none');
  repeatButton.classList.remove('repeat__btn_none');
});

repeatButton.addEventListener('click', () => {
  game.startGame();
});
