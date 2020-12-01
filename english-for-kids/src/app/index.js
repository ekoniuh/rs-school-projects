import '../styles/style.scss';
import dataCard from '../data/cards.json';
import { doc } from 'prettier';
const removeContainer = (target) => {
  if (target.closest('.category-card')) {
    document.querySelector('.cards').innerHTML = '';
  }
};
document
  .querySelector('.cards')
  .addEventListener('click', ({ target }) => removeContainer(target));

document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.navigation').classList.toggle('navigation_hidden');
  document
    .querySelector('.hamburger')
    .classList.toggle('hamburger__line_active');
});
const cards = require('../data/cards.json');
console.log(cards);

document.querySelector('.cards').addEventListener('click', (event) => {
  const { target } = event;

  if (target.closest('.category-card')) {
    const cardCategory =
      dataCard[`${target.closest('.category-card').textContent.trim()}`].cards;

    cardCategory.forEach((item, index) => {
      document.querySelector('.cards').insertAdjacentHTML(
        'beforeend',
        `
      <div class="card category-card_train" data-disabled="true" data-checked="true" data-word="">
					<div class="category-card__img">
						<img src="../assets/images/${item.image}" alt="Action (set A)">
					</div>
					<div class="category-card__title">
            <p>${item.word}</p>
            <button class="rotate"></button>
            
          </div>
         
				</div>
      `
      );
    });

    document.querySelector('.card').addEventListener('click', ({ target }) => {
      if (target.closest('.card')) {
        const word = target.closest('.card').textContent.trim();
        // if (!audio)
        let audio = new Audio(`./assets/audio/${word}.mp3`); // <== тоже самое что
        // document.createElement('audio)';
        // audio.src = `../assets/${word}.mp3`;
        audio.load();
        audio.play();
      }
    });
  }
});
