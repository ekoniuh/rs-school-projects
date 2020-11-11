// const cellSize = null;
let isMenuShow = true;
let empty = {
  value: 0,
  top: 0,
  left: 0,
};

let cells = [];
let sec = 0,
  min = 0,
  counterMove = 0;
let rotate = 0;
cells.push(empty);

function createHeader() {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `		<section class="page">
		<div class="menu">
      <ul class="menu-list">
      <li class="menu-item play-game">Continue</li>
				<li class="menu-item new-game">New Game</li>
				<li class="menu-item save-game">Saved games</li>
        <li class="menu-item settings">Settings</li>
        <li class="menu-item field-size__box">
	          <label class="nav__btn">Field size: </label>
	          <select class="select-box">
		          <option class="select-option" value="3">3x3</option>
		          <option class="select-option" value="4" selected="">4x4</option>
		          <option class="select-option" value="5">5x5</option>
		          <option class="select-option" value="6">6x6</option>
		          <option class="select-option" value="7">7x7</option>
		          <option class="select-option" value="8">8x8</option>
	          </select>
        </li>
				<li class="menu-item best-scores">Best scores</li>
			</ul>
		</div>
		<div class="content-box">
			<div class="control-wrap">
				<div class="info">
					<span class="description">Time </span>
					<span class="timer"></span>
				</div>
				<div class="moves">
					<span class="description">Moves</span>
					<span class="counter">0</span>
				</div>
        <img class="pause visible" src="./assets/pause-play.png" title = "pause">
        <img class="restart-game" src="./assets/47-512.png" title = "Restart">
		
			</div>

			<div class="field">
				
			</div>
			
			<audio src="./assets/audio.mp3" class="audio-play" type="audio/mp3"></audio>

		</div>

	</section>`
  );
}
createHeader();
const sizeField = document.querySelector('.select-box');
const restartGame = document.querySelector('.restart-game');
const field = document.querySelector('.field');
const time = document.querySelector('.timer');
const counterStep = document.querySelector('.counter');
const pauseGame = document.querySelector('.pause');
const menu = document.querySelector('.menu');
const playPauseGame = document.querySelector('.play-game');
const newGame = document.querySelector('.new-game');
const settings = document.querySelector('.settings');
const saveGame = document.querySelector('.save-game');
const bestScores = document.querySelector('.best-scores');
const fieldSizeDisplay = document.querySelector('.field-size__box');

function move(index, widthCell) {
  const cell = cells[index];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);
  const emptyLeft = empty.left;
  const emptyTop = empty.top;

  if (leftDiff + topDiff > 1) {
    return;
  }
  volume();

  counterMove += 1;
  cell.element.style.left = `${empty.left * widthCell}px`;
  cell.element.style.top = `${empty.top * widthCell}px`;

  empty.left = cell.left;
  empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  counterStep.innerHTML = counterMove;

  const isFinished = cells.every((cell) => {
    return cell.value === cell.top * size + cell.left;
  });

  if (isFinished) {
    alert(
      `Ура! Вы решили головоломку за ${time.innerHTML} и ${counterMove} ходов`
    );
  }
}

function getRestartGame(size) {
  newRandomArray = [...Array(size * size - 1).keys()].sort(
    () => Math.random() - 0.5
  );

  rotate += 360;
  restartGame.style.transform = `rotate(-${rotate}deg)`;
  field.innerHTML = '';
  min = 0;
  sec = 0;
  counterMove = 0;
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
  // restartGame.style.transform = `rotate(0deg)`;
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
  if (sec > 59) {
    min += 1;
    sec = 0;
    return;
  } else if (sec < 10 && min < 10) {
    time.innerHTML = `0${min}:0${sec}`;
  } else if (sec > 9 && min < 10) {
    time.innerHTML = `0${min}:${sec}`;
  } else {
    time.innerHTML = `${min}:${sec}`;
  }

  sec += 1;
}

let size = 4;

function volume() {
  const audio = document.querySelector('.audio-play');
  audio.src = './assets/audio.mp3';
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function openMenu() {
  if (menu.offsetLeft === -391) {
    menu.style.left = '-125px';
    document
      .querySelector('.content-box')
      .classList.toggle('content-box__scale');
  } else {
    document
      .querySelector('.content-box')
      .classList.toggle('content-box__scale');
    menu.style.left = '-391px';
  }

  // почему не перезаписывает?
}

function mouseMoveCell(event) {
  if (!event.target.classList.contains('field-item')) {
    return;
  }

  let shiftCurX = event.layerX;
  let shiftCurY = event.layerY;
  moveAt(event.clientX, event.clientY);

  function moveAt(clientX, clientY) {
    event.target.style.transitionDuration = '0s';
    event.target.style.left =
      clientX - field.getBoundingClientRect().left - shiftCurX + 'px';
    event.target.style.top =
      clientY - field.getBoundingClientRect().top - shiftCurY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  document.addEventListener('mousemove', onMouseMove);

  field.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    event.target.onmouseup = null;
    event.target.style.transitionDuration = '0.3s';
  };

  event.target.addEventListener('dragstart', () => false);
}

function getSizeGame() {
  settings.classList.toggle('menu-item__anime');
  if (fieldSizeDisplay.style.display === 'block') {
    fieldSizeDisplay.style.display = 'none';
    return;
  }
  fieldSizeDisplay.style.display = 'block';
}
let oldSize = 4;
function init() {
  let randomArray = [...Array(size * size - 1).keys()].sort(
    () => Math.random() - 0.5
  );

  buildCell(randomArray, size);

  sizeField.addEventListener('change', (e) => {
    size = +e.target.value;
    // getRestartGame(size);
  });

  playPauseGame.addEventListener('click', openMenu);
  restartGame.addEventListener('click', () => getRestartGame(oldSize));
  newGame.addEventListener('click', () => {
    getRestartGame(size);
    // buildCell(randomArray, size);
    oldSize = size;
    openMenu();
  });
  pauseGame.addEventListener('click', openMenu);
  settings.addEventListener('click', () => {
    getSizeGame();
  });

  field.addEventListener('mousedown', mouseMoveCell);
  setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', init());
