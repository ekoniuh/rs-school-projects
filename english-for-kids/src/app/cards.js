import dataCard from '../data/cards.json';
import statisticData from '../data/statisticsData';
import { shuffle, createStatistic } from './utils';
import checkedStatistic from './statistic';
import {
  buttonMenu,
  hamburgerMenu,
  categoryContainer,
  state,
  navigation,
  logo,
  answersContainer,
  startButton,
  repeatButton,
  mainPage,
} from './state';
import { playAudio } from './audio';
import Game from './game';
import { Menu } from './menu';
import GameState from './gameState';
const gameState = new GameState();

const game = new Game();
const menu = new Menu();
export default class Card {
  // constructor(labelCard, className) {}

  returnCard(card) {
    state.isCardRotate = true;
    card
      .closest('.card')
      .querySelector('.front')
      .classList.toggle('font-rotate');
    card
      .closest('.card')
      .querySelector('.back')
      .classList.toggle('back-rotate');
  }

  removeContainerCards() {
    categoryContainer.classList.toggle('category_none');
    // document.querySelector('.cards').classList.toggle('cards_none');
  }

  cardCategoryArray(nameCategory) {
    // if (target.classname)
    return dataCard[`${nameCategory}`].cards;
  }

  createCard() {
    this.removeContainerCards();
    state.cardCategoryArray.forEach((item) => {
      document.querySelector('.cards').insertAdjacentHTML(
        'beforeend',
        `
        <div class="card" data-disabled="true" data-checked="false" data-word="${
          item.word
        }">
        <div class="front">
          <div class="category-card__img">
            <img src="../assets/images/${item.image}" alt="Action (set A)">
          </div>
          <div class="category-card__title">
            <p>${item.word}</p>
            ${
              this.type === 'category' ? '' : '<button class="rotate"></button>'
            }
          </div>
        </div>
        <div class="back">
          <div class="category-card__img">
            <img src="../assets/images/${item.image}" alt="Action (set A)">
          </div>
          <div class="category-card__title">
            <p>${item.translation}</p>
          </div>
        </div>
    
      </div>
      `
      );
    });

    if (!state.isMainPage && state.isModeGame) {
      answersContainer.classList.remove('answers_none');
      startButton.classList.remove('start-game__btn_none');
      // repeatButton.classList.add('repeat__btn_none');
      this.hideTitleCards();
      // this.showStartButton();
    }
  }

  getDataCardFromCategory(target) {
    if (target.closest('.category-card')) {
      state.nameCategory = target
        .closest('.category-card')
        .querySelector('.category-card__title p').innerText;

      state.cardCategoryArray = dataCard[state.nameCategory].cards;
    } else if (
      target.classList.contains('navigation__link') &&
      !target.classList.contains('main-page')
    ) {
      state.nameCategory = target.innerText;

      state.cardCategoryArray = dataCard[target.innerText].cards;
    }
  }

  renderCards({ target }) {
    if (
      !target.closest('.category-card') &&
      !target.closest('.navigation__link') &&
      !target.classList.contains('main-page')
    ) {
      return;
    }

    // if (target.closest('.navigation__link').textContent === 'Statistics') {
    // if (target.dataset.statistic) {
    //   createStatistic();
    //   categoryContainer.classList.add('category_none');

    //   return;
    // }

    state.isMainPage = false;
    this.getDataCardFromCategory(target);
    this.createCard();

    state.wordGameArray = this.cardCategoryArray(state.nameCategory).map(
      (item) => item.word
    );
    shuffle(state.wordGameArray);

    const containerCards = document.querySelector('.cards');
    if (containerCards.dataset.cards !== 'cards') {
      containerCards.addEventListener('click', ({ target }) => {
        if (target.closest('.card')) {
          const isClickRotate = !target.classList.contains('rotate');
          const card = target.closest('.card');
          const { word, checked } = card.dataset;
          // state.statisticWord = word;

          if (isClickRotate && !state.isModeGame && !state.isCardRotate) {
            playAudio(word);
          } else if (checked === 'false' && state.isClickStart) {
            gameState.setStatistic('clicks', word);
            game.checkedWord(
              card,
              state.wordGameArray[state.wordGameArray.length - 1]
            );
          }
        }
      });
      containerCards.dataset.cards = 'cards';
    }

    [...document.querySelectorAll('.rotate')].forEach((item) =>
      item.addEventListener('click', () => {
        this.returnCard(item);
      })
    );
  }

  showStartButton() {
    answersContainer.classList.toggle('answers_none');
    startButton.classList.toggle('start-game__btn_none');
  }

  goToMainPage() {
    if (categoryContainer.classList.contains('category_none')) {
      menu.closeMenu();
      document.querySelector('.cards').innerHTML = '';
      categoryContainer.classList.toggle('category_none');
    }
  }

  hideStartButton() {
    // document
    //   .querySelector('.start-game__btn')
    //   .classList.toggle('start-game__btn_none');
    // repeatButton.classList.toggle('repeat__btn_none');
  }

  hideTitleCards() {
    [...document.querySelectorAll('.cards .category-card__title')].forEach(
      (item) => {
        item.classList.toggle('category-card__title_none');
      }
    );
    [...document.querySelectorAll('.cards .category-card__img img')].forEach(
      (item) => {
        item.classList.toggle('card__img_play');
      }
    );
  }

  removeAnswers() {
    if (
      document.querySelector('.error-answer') ||
      document.querySelector('.correct-answer')
    ) {
      [
        ...document.querySelectorAll('.error-answer'),
        ...document.querySelectorAll('.correct-answer'),
      ].forEach((item) => {
        item.parentNode.removeChild(item);
      });

      [...document.querySelectorAll('.category-card_train')].forEach((item) => {
        item.classList.remove('category-card_train');
      });
      [...document.querySelectorAll('.card')].forEach((card) => {
        card.dataset.checked = 'false';
      });
    }
  }
}
