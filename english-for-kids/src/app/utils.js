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
    state.isClickStart = false;

    document.querySelector('.cards').innerHTML = '';
    card.removeAnswers();

    // card.showStartButton();

    categoryContainer.classList.toggle('category_none');
    answersContainer.classList.add('answers_none');
    startButton.classList.add('start-game__btn_none');
    repeatButton.classList.add('repeat__btn_none');
  }
}

export function createStatistic() {
  document.querySelector('main').insertAdjacentHTML(
    'beforeend',
    `<div class="wrapper">
  <div class="statistics">
    <div class="statistics__buttons">
      <button class="statistics__button statistics__button_wide">Repeat difficult
        words</button>
      <button class="statistics__button">Reset</button>
    </div>
    <div class="statistics__table">
      <table class="table">
        <caption class="table__name">Cards</caption>
        <tr class="table__row table__row_head">
          <td class="table__sortable">Word</td>
          <td class="table__sortable">Translation</td>
          <td class="table__sortable"><span>↓ </span>Category</td>
          <td class="table__sortable">Clicks</td>
          <td class="table__sortable">Correct</td>
          <td class="table__sortable">Wrong</td>
          <td class="table__sortable">% errors</td>
        </tr>
        
      </table>
    </div>
  </div>
</div>`
  );
  statisticData.forEach((item) => {
    document.querySelector('.table__row_head').insertAdjacentHTML(
      'afterend',
      `<tr class="table__row">
    <td>${item.word}</td>
    <td>${item.translation}</td>
    <td>${item.label}</td>
    <td>${item.clicks}</td>
    <td>${item.correct}</td>
    <td>${item.wrong}</td>
    <td>${item.errors}</td>
  </tr>
    `
    );
  });

  // for (let key in dataCard) {
  //   dataCard[key].cards.forEach((item) => {

  //   });

  // const fragment = document.createDocumentFragment;
}
