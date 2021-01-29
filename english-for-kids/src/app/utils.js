import { categoryContainer, answersContainer, startButton, repeatButton, state } from './state';

const DECREASE_SORT_STATISTIC = 'false';
const INCREASE_SORT_STATISTIC = 'true';

export function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}

export function showMainPage(card) {
  if (categoryContainer.classList.contains('category_none')) {
    state.hash = 'main-page';
    card.setLocationHash(state.hash);
    state.isMainPage = true;

    document.querySelector('.navigation__link_active').classList.remove('navigation__link_active');
    document.querySelector('.main-page').classList.add('navigation__link_active');

    resetPage(card);
    categoryContainer.classList.toggle('category_none');
    document.querySelector('.answer-wrap').classList.add('answer-wrap_none');
  }
}

export function toStatisticPage(card, gameState) {
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
  createHeaderStatistic();
  renderStatistic(gameState);

  document.querySelector('.table__row_head').addEventListener('click', ({ target }) => {
    checkedSortStatistic(target, gameState);
  });

  document.querySelector('.statistics__button_reset').addEventListener('click', () => {
    gameState.resetStats();

    [...document.querySelectorAll('.table__row')].forEach((item) => {
      item.remove();
    });
    renderStatistic(gameState);
  });
}

function createHeaderStatistic() {
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
          <td class="table__sortable" data-sort="false">Word</td>
          <td class="table__sortable" data-sort="false">Translation</td>
          <td class="table__sortable" data-sort="false">Category</td>
          <td class="table__sortable" data-sort="false">Clicks</td>
          <td class="table__sortable" data-sort="false">Correct</td>
          <td class="table__sortable" data-sort="false">Wrong</td>
          <td class="table__sortable table__row_errors" data-sort="false">errors</td>
        </tr>
        
      </table>
    </div>
  </div>
`,
  );
}

function checkedSortStatistic(target, gameState) {
  if (target.dataset.sort === DECREASE_SORT_STATISTIC ) {
    target.dataset.sort = INCREASE_SORT_STATISTIC ;
    gameState.sortStatistic(target.textContent.toLowerCase());
  } else {
    target.dataset.sort = DECREASE_SORT_STATISTIC ;
    gameState.sortReverseStatistic();
  }

  [...document.querySelectorAll('.table__row')].forEach((item) => {
    item.remove();
  });

  renderStatistic(gameState);
}

function renderStatistic(gameState) {
  gameState.getStats();

  gameState.stats.forEach((item) => {
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
  </tr>`,
    );
  });
}

export function changeSwitchButton(state, card) {
  state.isModeGame = !state.isModeGame;
  state.isClickStart = false;
  document.querySelector('.switch__slider').textContent = !state.isModeGame ? 'Train' : 'Play';
  
  if (state.isMainPage && !state.isClickStatistic) {
    return;
  }
  card.removeAnswers();
  card.hideTitleCards();
  answersContainer.classList.toggle('answers_none');
  startButton.classList.remove('start-game__btn_none');
  repeatButton.classList.add('repeat__btn_none');
}
