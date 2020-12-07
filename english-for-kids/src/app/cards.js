import dataCard from '../data/cards.json';
import {
  buttonMenu,
  hamburgerMenu,
  categoryContainer,
  isMenuOpen,
  state,
} from './state';
import { playAudio } from './audio';
import Game from './game';
import { Menu } from './menu';
const game = new Game();
const menu = new Menu();
export class Card {
  constructor(labelCard, className) {}

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
    document.querySelector('.category').classList.toggle('category_none');
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
      document.querySelector('.answers').classList.remove('answers_none');
      document
        .querySelector('.start-game__btn')
        .classList.remove('start-game__btn_none');
      // document.querySelector('.repeat__btn').classList.add('repeat__btn_none');
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
      console.log(target.classList.contains('main-page'));
      return;
    }

    state.isMainPage = false;
    this.getDataCardFromCategory(target);
    this.createCard();

    state.wordGameArray = this.cardCategoryArray(state.nameCategory).map(
      (item) => item.word
    );

    state.containerCards = document.querySelector('.cards');

    state.containerCards.addEventListener('click', ({ target }) => {
      if (target.closest('.card')) {
        const isClickRotate = !target.classList.contains('rotate');
        const card = target.closest('.card');
        const { word, checked } = card.dataset;

        if (isClickRotate && !state.isModeGame && !state.isCardRotate) {
          playAudio(word);
        } else if (checked === 'false' && state.isClickStart) {
          game.checkedWord(
            card,
            state.wordGameArray[state.wordGameArray.length - 1]
          );
        }
      }
    });

    // не нравится
    const arr = Array.from(document.querySelectorAll('.rotate'));

    arr.forEach((item) =>
      item.addEventListener('click', () => {
        this.returnCard(item);
      })
    );
  }

  showStartButton() {
    document.querySelector('.answers').classList.toggle('answers_none');
    document
      .querySelector('.start-game__btn')
      .classList.toggle('start-game__btn_none');
  }

  goToMainPage() {
    if (
      document.querySelector('.category').classList.contains('category_none')
    ) {
      menu.closeMenu();
      document.querySelector('.cards').innerHTML = '';
      document.querySelector('.category').classList.toggle('category_none');
    }
  }

  hideStartButton() {
    // document
    //   .querySelector('.start-game__btn')
    //   .classList.toggle('start-game__btn_none');
    // document.querySelector('.repeat__btn').classList.toggle('repeat__btn_none');
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
