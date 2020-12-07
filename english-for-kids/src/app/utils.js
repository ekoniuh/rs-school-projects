import dataCard from '../data/cards.json';
function onChangeCardStyle() {
  const cardGame = document.querySelectorAll('');
  cardGame.array.forEach((element) => {
    element.classList.toggle;
  });
}

function createIndicator(answer) {
  const indicator = document.createElement('div');
  indicator.classList.add();
  return indicator;
}

export function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
  // for (let i = arr.length - 1; i > 0; i++) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [arr[i], arr[j]] = [arr[j], arr[i]];
  // }
  // return arr;
}

export function statistic() {
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
  for (let key in dataCard) {
    console.log(key);
    //   document.querySelector('.table__row_head').insertAdjacentHTML(
    //     'beforeend',
    //     ` <tr class="table__row">
    //   <td>${key.cards.word}</td>
    //   <td>${key.cards.translation}</td>
    //   <td>key</td>
    //   <td>0</td>
    //   <td>1</td>
    //   <td>0</td>
    //   <td>0.00</td>
    // </tr>
    //   `
    // );
    // const fragment = document.createDocumentFragment;
  }
}
