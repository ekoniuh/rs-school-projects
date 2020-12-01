import dataCard from '../data/cards.json';
import { buttonMenu, hamburgerMenu, card, isMenuOpen } from './state';
import { playAudio } from './audio';

export class Card {
  constructor(labelCard, className) {
    // returnCard // перевернуть карту {
    //   const flippedCard = document.querySelector('.card_fipped') || false;
    //   if(flipped && !e.target.closest('.card_flipped')){
    //     flippedCard.classList.toggle('card_flipped')
    //   }
  }

  renderCards(target, cardCategoryArray) {
    this.removeContainerCards(target);
    if (target.closest('.category-card')) {
      cardCategoryArray.forEach((item) => {
        card.insertAdjacentHTML(
          'beforeend',
          `
        <div class="card category-card_train" data-disabled="true" data-checked="true" data-word="">
            <div class="category-card__img">
              <img src="../assets/images/${item.image}" alt="Action (set A)">
            </div>
            <div class="category-card__title">
              <p>${item.word}</p>
              ${
                this.type === 'category'
                  ? ''
                  : '<button class="rotate"></button>'
              }
            </div>
         </div>
        `
        );
      });

      card.addEventListener('click', ({ target }) => {
        // const { target } = event;

        if (target.closest('.card')) {
          const word = target.closest('.card').textContent.trim();
          // if (audio === undefined) {
          playAudio(word);
          // }
        }
      });
    }
  }

  removeContainerCards(target) {
    if (target.closest('.category-card')) {
      document.querySelector('.cards').innerHTML = '';
    }
  }

  // animateAnswer(card, indicator){
  //   card.classList.add('adssad{ind}');
  //   setTimeout(()
  //   card.classList.remove('{ind}'))
  // }
}
