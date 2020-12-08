import { doc } from 'prettier';
import statisticData from '../data/statisticsData';
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
} from './state';
// import Card from './cards';

// debugger;
// const card = new Card();

export function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}

export function showMainPage(card) {
  if (categoryContainer.classList.contains('category_none')) {
    state.isMainPage = true;
    resetPage(card);
    categoryContainer.classList.toggle('category_none');
    // document.querySelector('.statistics').remove();
  }
}

export function toStatisticPage(card, gameState) {
  state.isMainPage = false;
  resetPage(card);

  categoryContainer.classList.add('category_none');
  createStatistic(gameState);
}

export function removeStatistic() {
  if (document.querySelector('.statistics')) {
    document.querySelector('.statistics').remove();
  }
}

function resetPage(card) {
  document.querySelector('.cards').innerHTML = '';
  state.isClickStart = false;
  card.removeAnswers();

  if (document.querySelector('.statistics')) {
    document.querySelector('.statistics').remove();
  }

  answersContainer.classList.add('answers_none');
  startButton.classList.add('start-game__btn_none');
  repeatButton.classList.add('repeat__btn_none');
}

export function createStatistic(gameState) {
  document.querySelector('main').insertAdjacentHTML(
    'beforeend',
    `
  <div class="wrapper statistics">
    <div class="statistics__buttons">
      <button class="statistics__button statistics__button_wide">Repeat difficult
        words</button>
      <button class="statistics__button statistics__button_reset">Reset</button>
    </div>
    <div class="statistics__table">
      <table class="table">
        <caption class="table__name">Cards</caption>
        <tr class="table__row_head">
          <td class="table__sortable">Word</td>
          <td class="table__sortable">Translation</td>
          <td class="table__sortable"><span>↓</span>Category</td>
          <td class="table__sortable">Clicks</td>
          <td class="table__sortable">Correct</td>
          <td class="table__sortable">Wrong</td>
          <td class="table__sortable">% errors</td>
        </tr>
        
      </table>
    </div>
  </div>
`
  );
  renderStatistic(gameState);

  document
    .querySelector('.table__row_head')
    .addEventListener('click', ({ target }) => {
      gameState.sortStatistic(target.textContent.toLowerCase());
      // console.log(target.textContent.toLowerCase());
      [...document.querySelectorAll('.table__row')].forEach((item) => {
        item.remove();
      });
      renderStatistic(gameState);
    });

  document
    .querySelector('.statistics__button_reset')
    .addEventListener('click', () => {
      gameState.resetStats();
      // document.querySelectorAll('.table__row_head').innerHTML = '';
      [...document.querySelectorAll('.table__row')].forEach((item) => {
        item.remove();
      });
      renderStatistic(gameState);
    });
  // const fragment = document.createDocumentFragment;
}

function renderStatistic(gameState) {
  gameState.getStats();
  gameState.stats.forEach((item) => {
    console.log('item.word', item.category);
    document.querySelector('.table__row_head').insertAdjacentHTML(
      'afterend',
      `<tr class="table__row">
    <td>${item.word}</td>
    <td>${item.translation}</td>
    <td>${item.category}</td>
    <td>${item.clicks}</td>
    <td>${item.correct}</td>
    <td>${item.wrong}</td>
    <td>${item.errors}</td>
  </tr>`
    );
  });
}
