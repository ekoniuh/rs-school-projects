import '../styles/style.scss';
import dataCard from '../data/cards.json';
import { doc } from 'prettier';
import { buttonMenu, hamburgerMenu, categoryContainer, state } from './state';
import { Menu } from './menu';
import { playAudio } from './audio';
import { Card } from './cards';
import Game from './game';
const card = new Card();
const menu = new Menu();
const game = new Game();
categoryContainer.addEventListener('click', (event) => card.renderCards(event));
buttonMenu.addEventListener('click', () => menu.openMenu(state.isMenuOpen));

document.querySelector('.navigation').addEventListener(
  'click',
  (event) => {
    card.renderCards(event);
    menu.closeMenu();
  }

  // if (target.classList.className === 'navigation__link') {
  //   console.log(target.innerText.trim());
  //   card.renderCards(event);
  // }
);

document.querySelector('.logo-title').addEventListener('click', () => {
  if (document.querySelector('.category').classList.contains('category_none')) {
    // document.querySelector('.cards').classList.remove();
    document.querySelector('.cards').innerHTML = '';
    document.querySelector('.category').classList.toggle('category_none');
  }
});

document
  .querySelector('.navigation__link.navigation__link_active')
  .addEventListener('click', () => {
    if (
      document.querySelector('.category').classList.contains('category_none')
    ) {
      // document.querySelector('.cards').classList.remove();
      document.querySelector('.cards').innerHTML = '';
      document.querySelector('.category').classList.toggle('category_none');
    }
  });

document.querySelector('.switch__label').addEventListener('click', () => {

	// 	 document.querySelector('.repeat-button').classList.toggle('repeat-button_none');

      // Array.from(document.querySelectorAll('.cards .category-card__title')).forEach(
      //   (item) => {
      //     item.classList.toggle('category-card__title_none');
      //   }
      // );
});

document.querySelector('.repeat-button').addEventListener('click', () => {
	const { length } = state.wordGameArray;
	
  // при нажатии меняем кнопку
  game.startGame();
  shuffle(state.wordGameArray);
  setTimeout(() => {
    playAudio(state.wordGameArray[length - 1]);
  }, 1000);
});

document.querySelector('.repeat-button').addEventListener('click', () => {});
// document.querySelector('').addEventListener('click', () => {});
