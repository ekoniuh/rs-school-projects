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

  createCard(cardDataArray) {
    this.removeContainerCards();
    cardDataArray.forEach((item) => {
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

  renderCards({ target }) {
    if (target.closest('.category-card')) {
      state.nameCategory = target.closest('.category-card').textContent.trim();
      state.cardCategoryArray = dataCard[state.nameCategory].cards;
    } else if (target.classList.contains('navigation__link')) {
      state.nameCategory = target.innerText;
      state.cardCategoryArray = dataCard[target.innerText].cards;
    }

    state.wordGameArray = this.cardCategoryArray(state.nameCategory).map(
      (item) => item.word
    );

    this.createCard(this.cardCategoryArray(state.nameCategory));
    state.targetCard = document.querySelector('.cards');
    document.querySelector('.cards').addEventListener('click', ({ target }) => {
      const card = target.closest('.card');
      const { word, checked } = card.dataset;

      // if (card && !target.classList.contains('rotate') && !state.playActive) {
      //   // const word = card.querySelector('.front p').textContent;
      //   playAudio(word);
      // } else
      if (card && checked === 'false' && state.playActive) {
        game.checkedWord(
          card,
          state.wordGameArray[state.wordGameArray.length - 1]
        );
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
