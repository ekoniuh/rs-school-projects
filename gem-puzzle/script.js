const cellSize = 100;
let numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);

const empty = {
  value: 0,
  top: 0,
  left: 0,
};
const cells = [];

let sec = 0,
  min = 0,
  counter = 0;

cells.push(empty);

document.body.insertAdjacentHTML(
  'afterbegin',
  `<header class="header">
<div class="info">
	<span class="description">Time </span>
	<span class="timer"></span>
</div>
<div class="moves">
	<span class="description">Moves </span>
	<span class="counter">0</span>
</div>
<button class="pause visible">Pause game</button>
<button class="restart-game">Restart</button>
</header>
<div class="field"></div>`
);
const restartGame = document.querySelector('.restart-game');
const field = document.querySelector('.field');
const time = document.querySelector('.timer');
const counterStep = document.querySelector('.counter');

function move(index) {
  const cell = cells[index];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);

  if (leftDiff + topDiff > 1) {
    return;
  }
  counter += 1;
  cell.element.style.left = `${empty.left * cellSize}px`;
  cell.element.style.top = `${empty.top * cellSize}px`;

  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  empty.left = cell.left;
  empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  counterStep.innerHTML = counter;

  const isFinished = cells.every((cell) => {
    return cell.value === cell.top * 4 + cell.left;
  });

  if (isFinished) {
    alert(`Ура! Вы решили головоломку за ${min}:${sec} и ${counter} ходов`);
  }
}

function getRestartGame() {
  numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);
  field.innerHTML = '';
  min = 0;
  sec = 0;
  counter = 0;
  counterStep.innerHTML = 0;
  buildCell();
}

function buildCell() {
  for (let i = 1; i <= 15; i++) {
    const cell = document.createElement('div');
    cell.className = 'field-item';
    value = numbers[i - 1] + 1;
    cell.innerHTML = value;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
      value: value,
      left: left,
      top: top,
      element: cell,
    });

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);
    cell.addEventListener('click', () => {
      move(i);
    });
  }
}

function tick() {
  if (sec > 60) {
    min += 1;
    sec = 0;
  }

  sec++;
  time.innerHTML = `${min}:${sec}`;
}

function init() {
  buildCell();
  setInterval(tick, 1000);
  restartGame.addEventListener('click', () => getRestartGame());
}

document.addEventListener('DOMContentLoaded', init());
