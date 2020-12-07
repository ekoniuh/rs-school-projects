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
} from './state';
import { Menu } from './menu';
import Card from './cards';
import Game from './game';
import { showMainPage } from './utils';

const card = new Card();
const menu = new Menu();
const game = new Game();

alert(
  'Здравствуйте. Если вас не затруднит, не могли бы вы проверить задание ближе к выходным?(это сообщение относится к студентам)'
);

categoryContainer.addEventListener('click', (event) => card.renderCards(event));
buttonMenu.addEventListener('click', (event) => menu.openMenu(event));
navigation.addEventListener('click', (event) => {
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

document.querySelector('.switch__input').addEventListener('change', () => {
  //TODO: почему нажимается два раза на кнопку?
  state.isModeGame = !state.isModeGame;
  state.isClickStart = false;
  // shuffle(state.wordGameArray);
  if (state.isMainPage) {
    return;
  }
  card.removeAnswers();
  card.hideTitleCards();
  // card.showStartButton();

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
