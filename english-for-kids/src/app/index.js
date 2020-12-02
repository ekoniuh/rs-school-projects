import '../styles/style.scss';
import dataCard from '../data/cards.json';
import { doc } from 'prettier';
import { buttonMenu, hamburgerMenu, cardsContainer, state } from './state';
import { Menu } from './menu';
import { playAudio } from './audio';
import { Card } from './cards';

const card = new Card();
const menu = new Menu();

cardsContainer.addEventListener('click', (event) => card.renderCards(event));
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
// document.body.addEventListener('click', menu.closeMenu);
// card.addEventListener('click', ({ target }) => {
//   // const { target } = event;
//   const cardCategoryArray =
//     dataCard[`${target.closest('.category-card').textContent.trim()}`].cards;
//   cards.renderCards(target, cardCategoryArray);
// });
