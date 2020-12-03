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

const game = new Game();
export class Card {
  constructor(labelCard, className) {}

  returnCard(card) {
    card
      .closest('.card')
      .querySelector('.front')
      .classList.toggle('font-rotate');
    card
      .closest('.card')
      .querySelector('.back')
      .classList.toggle('back-rotate');

    // const flippedCard = document.querySelector('.card_fipped') || false;
    // if (flipped && !target.closest('.card_flipped')) {
    //   flippedCard.classList.toggle('card_flipped');
    // }
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
  }

  getDataCardFromCategory(target) {
    if (target.closest('.category-card')) {
      // TODO не нравится мне так брать имя категории
      state.nameCategory = target
        .closest('.category-card')
        .querySelector('.category-card__title p').innerText;

      state.cardCategoryArray = dataCard[state.nameCategory].cards;
    } else if (target.classList.contains('navigation__link')) {
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

    this.getDataCardFromCategory(target);
    this.createCard();

    state.wordGameArray = this.cardCategoryArray(state.nameCategory).map(
      (item) => item.word
    );

    state.containerCards = document.querySelector('.cards');

    state.containerCards.addEventListener('click', ({ target }) => {
      if (target.closest('.card')) {
        const card = target.closest('.card');
        const { word, checked } = card.dataset;
        const isClickRotate = !target.classList.contains('rotate');
        // if (card && !target.classList.contains('rotate') && !state.playActive) {
        if (isClickRotate && !state.isModeGame) {
          // const word = card.querySelector('.front p').textContent;
          playAudio(word);
        }
        // if (checked === 'false' && state.playActive) {
        else if (checked === 'false' && state.isClickStart) {
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
}
