const cellSize = 100;

let empty = {
  value: 0,
  top: 0,
  left: 0,
};

let cells = [];
let sec = 0,
  min = 0,
  counter = 0;

cells.push(empty);

function createHeader() {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `	<header class="header">
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
		<div class="field"></div>
		<div class="screen-container">
    <h2 class="screen__title">Settings</h2>
    <label class="nav__btn">Field size: </label>
    <select class="select-box">
    <option class="select-option" value="3">3x3</option>
    <option class="select-option" value="4" selected="">4x4</option>
    <option class="select-option" value="5">5x5</option>
    <option class="select-option" value="6">6x6</option>
    <option class="select-option" value="7">7x7</option>
    <option class="select-option" value="8">8x8</option>
    </select>
		</div>`
  );
}
createHeader();

const restartGame = document.querySelector('.restart-game');
const field = document.querySelector('.field');
const time = document.querySelector('.timer');
const counterStep = document.querySelector('.counter');

function move(index, widthCell) {
  const cell = cells[index];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);

  if (leftDiff + topDiff > 1) {
    return;
  }

  const audio = document.querySelector('.audio-play');
  audio.src = './assets/audio.mp3';
  audio.pause();
  audio.currentTime = 0;
  audio.play();

  counter += 1;
  cell.element.style.left = `${empty.left * widthCell}px`;
  cell.element.style.top = `${empty.top * widthCell}px`;

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

function getRestartGame(size) {
  newRandomArray = [...Array(size * size - 1).keys()].sort(
    () => Math.random() - 0.5
  );
  field.innerHTML = '';
  min = 0;
  sec = 0;
  counter = 0;
  counterStep.innerHTML = 0;
  empty = {
    value: 0,
    top: 0,
    left: 0,
  };
  cells = [];
  cells.push(empty);
  buildCell(newRandomArray, size);
  document
    .querySelectorAll('.field-item')
    .forEach((item) => (item.style.fontSize = size > 6 ? '25px' : '50px'));

  // Как исправить, не получилось ко всем элементам применить
}

let randomArray = [];

function buildCell(array, size) {
  if (!array) {
    randomArray = [...Array(size * size - 1).keys()].sort(
      () => Math.random() - 0.5
    );
  }

  let randomArray = array;
  let widthCell = 400 / size;

  field.style.gridTemplateColumns = `repeat(${size}, 1fr);`;
  for (let i = 1; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.className = 'field-item';

    value = randomArray[i - 1] + 1;
    cell.innerHTML = value;

    const left = i % size;
    const top = (i - left) / size;

    cells.push({
      value: value,
      left: left,
      top: top,
      element: cell,
    });

    cell.style.left = `${left * widthCell}px`;
    cell.style.top = `${top * widthCell}px`;

    field.append(cell);
    cell.style.width = `${widthCell}px`;
    cell.style.height = `${widthCell}px`;

    cell.addEventListener('click', () => {
      move(i, widthCell);
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

let size = 4;

function init() {
  let randomArray = [...Array(size * size - 1).keys()].sort(
    () => Math.random() - 0.5
  );

  buildCell(randomArray, size);

  document.querySelector('.select-box').addEventListener('change', function () {
    size = +this.value;
    console.log(document.querySelectorAll('.field-item'));

    getRestartGame(size);
  });

  // document.getElementById('generateField').addEventListener('click', function(){createField(size)});

  setInterval(tick, 1000);
  restartGame.addEventListener('click', () => getRestartGame(size));
}

document.addEventListener('DOMContentLoaded', init());
