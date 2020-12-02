import dataCard from '../data/cards.json';
import {
  buttonMenu,
  hamburgerMenu,
  cardsContainer,
  isMenuOpen,
  state,
} from './state';
import { playAudio } from './audio';
export class Card {
  constructor(labelCard, className) {}

  returnCard({ target }) {
    const flippedCard = document.querySelector('.card_fipped') || false;
    if (flipped && !target.closest('.card_flipped')) {
      flippedCard.classList.toggle('card_flipped');
    }
  }

  removeContainerCards() {
    document.querySelector('.category').classList.toggle('category_none');
    document.querySelector('.cards').classList.toggle('cards_none');
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
        <div class="card category-card_train" data-disabled="true" data-checked="true" data-word="">
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
    } else if (target.classList.contains('navigation__link')) {
      state.nameCategory = target.innerText;
    }

    this.createCard(this.cardCategoryArray(state.nameCategory));

    document.querySelector('.cards').addEventListener('click', ({ target }) => {
      if (
        target.closest('.card') &&
        !target.classList.contains('rotate') &&
        !state.playActive
      ) {
        const word = target.closest('.card').querySelector('.front p')
          .textContent;
        playAudio(word);
      }
    });

    const arr = Array.from(document.querySelectorAll('.rotate'));

    arr.forEach((item) =>
      item.addEventListener('click', () => {
        item
          .closest('.card')
          .querySelector('.front')
          .classList.toggle('font-rotate');
        item
          .closest('.card')
          .querySelector('.back')
          .classList.toggle('back-rotate');
      })
    );
  }

  // animateAnswer(card, indicator){
  //   card.classList.add('adssad{ind}');
  //   setTimeout(()
  //   card.classList.remove('{ind}'))
  // }
}
