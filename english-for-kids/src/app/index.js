import '../styles/style.scss';
import dataCard from '../data/cards.json';
import { doc } from 'prettier';
import { buttonMenu, hamburgerMenu, card, state } from './state';
import { Menu } from './menu';
import { playAudio } from './audio';
import { Card } from './cards';

const cards = new Card();
const menu = new Menu();

// card.addEventListener('click', cards.removeContainerCards);
buttonMenu.addEventListener('click', () => menu.openMenu(state.isMenuOpen));
document.body.addEventListener('click', menu.closeMenu);
// card.addEventListener('click', ({ target }) => {
//   // const { target } = event;
//   const cardCategoryArray =
//     dataCard[`${target.closest('.category-card').textContent.trim()}`].cards;
//   cards.renderCards(target, cardCategoryArray);
// });
