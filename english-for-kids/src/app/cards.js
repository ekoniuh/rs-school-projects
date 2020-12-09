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
import Menu from './menu';
import gameState from './gameState';

// const gameState = new GameState();
const game = new Game();
const menu = new Menu();
export default class Card {
  // constructor(labelCard, className) {}

  returnCard(card, isClickRotate) {
    if (isClickRotate) {
      card
        .closest('.card')
        .querySelector('.front')
        .classList.toggle('font-rotate');
      card
        .closest('.card')
        .querySelector('.back')
        .classList.toggle('back-rotate');
    }
    // state.isCardRotate = true;
  }

  removeContainerCards({ target }) {
    if (target.closest('.navigation__link')) {
      document
        .querySelector('.navigation__link_active')
        .classList.remove('navigation__link_active');
      target.classList.add('navigation__link_active');
      document.querySelector('.cards').innerHTML = '';
    }
  }

  cardCategoryArray(nameCategory) {
    // if (target.classname)
    return dataCard[`${nameCategory}`].cards;
  }

  createCard() {
    categoryContainer.classList.add('category_none');

    state.cardCategoryArray.forEach((item) => {
      document.querySelector('.cards').insertAdjacentHTML(
        'beforeend',
        `
        <div class="card" data-disabled="true" data-checked="false" data-word="${
          item.word
        }">
        <div class="front">
          <div class="category-card__img">
            <img src="./assets/images/${item.image}" alt="Action (set A)">
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
            <img src="./assets/images/${item.image}" alt="Action (set A)">
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

      this.hideTitleCards();
    }
  }

  setLocationHash(nameHash) {
    window.location.hash = nameHash;
  }

  getDataCardFromCategory(target) {
    if (target.closest('.category-card')) {
      state.hash = target.closest('.category-card').dataset.hash;
      state.nameCategory = target
        .closest('.category-card')
        .querySelector('.category-card__title p').innerText;

      state.cardCategoryArray = dataCard[state.nameCategory].cards;
    } else if (
      target.classList.contains('navigation__link') &&
      !target.classList.contains('main-page')
    ) {
      state.hash = target.dataset.hash;
      state.nameCategory = target.innerText;

      state.cardCategoryArray = dataCard[target.innerText].cards;
    }
  }

  renderCards({ target }) {
    if (
      !target.closest('.category-card') &&
      !target.closest('.navigation__link')
    ) {
      return;
    }
    document.querySelector('.answer-wrap').classList.add('answer-wrap_none');

    // state.isClickStatistic = false;
    state.isMainPage = false;

    this.getDataCardFromCategory(target);
    this.setLocationHash(state.hash);
    this.createCard();
    menu.addStyleActiveLink();

    state.wordGameArray = this.cardCategoryArray(state.nameCategory).map(
      (item) => item.word
    );
    shuffle(state.wordGameArray);

    const containerCards = document.querySelector('.cards');

    this.clickCard(containerCards);

    // [...document.querySelectorAll('.rotate')].forEach((item) =>
    //   item.addEventListener('click', () => {
    //     this.returnCard(item);
    //   })
    // );
  }

  clickCard(containerCards) {
    if (containerCards.dataset.cards !== 'cards') {
      containerCards.addEventListener('click', ({ target }) => {
        if (target.closest('.card')) {
          state.isClickRotate = target.classList.contains('rotate');

          const card = target.closest('.card');
          const { word, checked } = card.dataset;

          this.clickButtonRotateCard(card, target);

          if (
            !state.isClickRotate &&
            !state.isModeGame &&
            !state.isCardRotate
          ) {
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
  }

  clickButtonRotateCard(card, target) {
    if (state.isClickRotate) {
      document.querySelector('.rotate').addEventListener('click', () => {
        // state.isClickRotate = true;
        this.returnCard(card, state.isClickRotate);
      });

      card.addEventListener('mouseleave', () => {
        this.returnCard(card, state.isClickRotate);
        state.isClickRotate = false;
      });
    }
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
