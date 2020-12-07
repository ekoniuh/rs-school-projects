import '../styles/style.scss';
import dataCard from '../data/cards.json';
import { doc } from 'prettier';
import { buttonMenu, hamburgerMenu, categoryContainer, state } from './state';
import { Menu } from './menu';
import { playAudio } from './audio';
import { Card } from './cards';
import Game from './game';
import { shuffle, statistic } from './utils';
const card = new Card();
const menu = new Menu();
const game = new Game();
statistic();
categoryContainer.addEventListener('click', (event) => card.renderCards(event));
buttonMenu.addEventListener('click', (event) => menu.openMenu(event));
// document.querySelector('.nav-box').addEventListener('click', (event) => menu.closeMenu(event));

document.querySelector('.navigation').addEventListener('click', (event) => {
  card.renderCards(event);
  menu.closeMenu();
});

document.querySelector('.logo-title').addEventListener('click', () => {
  if (document.querySelector('.category').classList.contains('category_none')) {
    state.isMainPage = true;
    state.isClickStart = false;
    document.querySelector('.cards').innerHTML = '';
    card.removeAnswers();

    document.querySelector('.category').classList.toggle('category_none');

    // card.showStartButton();
    document.querySelector('.answers').classList.add('answers_none');
    document
      .querySelector('.start-game__btn')
      .classList.add('start-game__btn_none');
    document.querySelector('.repeat__btn').classList.add('repeat__btn_none');
  }
});

//FIXME: переименовать класс
document.querySelector('.main-page').addEventListener('click', () => {
  if (document.querySelector('.category').classList.contains('category_none')) {
    state.isMainPage = true;
    state.isClickStart = false;
    document.querySelector('.cards').innerHTML = '';
    card.removeAnswers();

    document.querySelector('.category').classList.toggle('category_none');

    // card.showStartButton();
    document.querySelector('.answers').classList.add('answers_none');
    document
      .querySelector('.start-game__btn')
      .classList.add('start-game__btn_none');
    document.querySelector('.repeat__btn').classList.add('repeat__btn_none');
  }
  // card.goToMainPage();
});

document.querySelector('.switch__input').addEventListener('change', () => {
  //TODO: почему нажимается два раза на кнопку?
  state.isModeGame = !state.isModeGame;
  state.isClickStart = false;
  shuffle(state.wordGameArray);
  console.log(state.wordGameArray);
  if (state.isMainPage) {
    return;
  }
  card.removeAnswers();
  card.hideTitleCards();
  // card.showStartButton();

  document.querySelector('.answers').classList.toggle('answers_none');
  document
    .querySelector('.start-game__btn')
    .classList.remove('start-game__btn_none');
  document.querySelector('.repeat__btn').classList.add('repeat__btn_none');
});

document.querySelector('.start-game__btn').addEventListener('click', () => {
  state.isClickStart = true;
  game.startGame();
  // card.hideStartButton();
  document
    .querySelector('.start-game__btn')
    .classList.add('start-game__btn_none');
  document.querySelector('.repeat__btn').classList.remove('repeat__btn_none');
});

document.querySelector('.repeat__btn').addEventListener('click', () => {
  game.startGame();
});
// document.querySelector('.repeat-button').addEventListener('click', () => {});
// document.querySelector('.repeat-button').addEventListener('click', () => {});
