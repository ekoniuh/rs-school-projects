// const cellSize = null;
let isMenuShow = true,
  isPlayPause = true;

let sizeGame = 4;
let cells = [];
let sec = 0,
  min = 0,
  counterMove = 0,
  rotate = 0;
let empty = {
  value: 0,
  top: 0,
  left: 0,
};
cells.push(empty);

function createHeader() {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `		<section class="page">
    <div class="menu menu_opacity">
    <div class="menu-wrapper">
      <ul class="menu-list">
      <li class="menu-item play-game">Continue</li>
				<li class="menu-item new-game">New Game</li>
        <li class="menu-item save-game">Saved games</li>
        <li class="menu-item load-game">load Game</li>
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
const continueGame = document.querySelector('.pause');
const menu = document.querySelector('.menu');
const playPauseGame = document.querySelector('.play-game');
const newGame = document.querySelector('.new-game');
const settings = document.querySelector('.settings');
const saveGame = document.querySelector('.save-game');
const loadGame = document.querySelector('.load-game');
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
    return cell.value === cell.top * sizeGame + cell.left;
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
  // if (size > 6) {
  //   field.style.height = '500px';
  //   field.style.width = '500px';
  // }
  // restartGame.style.transform = `rotate(0deg)`;
  let randomArray = array;
  let widthCell = field.offsetWidth / size;
  let heightCell = field.offsetHeight / size;

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
    cell.style.height = `${heightCell}px`;

    cell.addEventListener('click', () => {
      move(i, widthCell);
    });
  }
}

function tick(isPlayPause) {
  if (!isPlayPause) {
    return;
  }

  // setInterval(sec++, 1000);
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
  sec++;
  // setInterval(tick(isPlayPause, sec), 1000);
}

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
    // menu.style.opacity = 1;
    menu.classList.toggle('menu_opacity');
  } else {
    menu.classList.toggle('menu_opacity');
    // menu.style.opacity = 1;
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

// НАДО ЛИ СОЗДАВАТЬ ОБЪЕКТ ПУСТОЙ
function saveGamePlay(saveObj) {
  if (isPlayPause) {
    // по клику постоянно записывает
  }

  saveObj['timer'].push(time.innerHTML);
  saveObj['move counter'].push(counterStep.innerHTML);
  saveObj['Board size'].push(sizeGame);
  localStorage.setItem('itemCache', JSON.stringify(saveObj));

  // timeArrSave.push(time.innerHTML);
  // countStepArrSave.push(counterStep.innerHTML);
  // saveObj['timer'].concat(timeArrSave);
  // localStorage.setItem('itemCache', saveObj);
  // parseStorageObj = (localStorage.getItem('itemCache'));
}

function downloadGame(saveObj) {
  // if (saveObj) {
  //   return;
  // }
  // menu.insertAdjacentHTML(
  //   'afterend',
  //   `
  //        <ul class ="save-list__box"></ul>
  //     `
  // );

  const button = document.createElement('button');
  button.className = 'button-back';

  document.querySelector('.menu-list').style.left = '-204px';
  const ul = document.createElement('ul');
  ul.className = `save-list__box`;
  document.querySelector('.menu-wrapper').append(ul);
  for (let i = 0; i < saveObj.timer.length; i++) {
    const li = document.createElement('li');
    li.classList.add('save-list__item');
    li.dataset.index = i;
    li.innerHTML = `Board size: ${saveObj['Board size'][i]}x${saveObj['Board size'][i]} time ${saveObj.timer[i]} move  ${saveObj['move counter'][i]}`;
    document.querySelector('.save-list__box').append(li);

    if (i === 0) {
      li.classList.add('save-list__item_active');
    }
  }
  setInterval(
    () => (document.querySelector('.save-list__box').style.left = '0px'),
    1000
  );
}

// li.addEventListener('click', ({ target }) => {
//   Array.from(document.querySelectorAll('.save-list__box')).forEach((item) =>
//     item.classList.remove('save-list__item_active')
//   );
//    li.dataset.index
// });

function getSaveGame() {
  // if (JSON.parse(localStorage.getItem('itemCache'))) {
  //   saveObj = JSON.parse(localStorage.getItem('itemCache')) === null ?  {
  //     timer: [],
  //     'move counter': [],
  //   } :  JSON.parse(localStorage.getItem('itemCache'));
  // } else
  // let saveObj = {
  //   timer: [],
  //   'move counter': [],
  // };
  return JSON.parse(localStorage.getItem('itemCache')) === null
    ? {
        timer: [],
        'move counter': [],
        'Board size': [],
      }
    : JSON.parse(localStorage.getItem('itemCache'));
}

function init() {
  let randomArray = [...Array(sizeGame * sizeGame - 1).keys()].sort(
    () => Math.random() - 0.5
  );

  saveObj = getSaveGame();
  setInterval(() => tick(isPlayPause), 1000);
  // saveObj = JSON.parse(localStorage.getItem('itemCache')) === null ? ;
  // ЗДЕСЬ ЛИ МНЕ ЭТО ДЕЛАТЬ? Я ПРО ОБЪЕКТ
  buildCell(randomArray, sizeGame);

  sizeField.addEventListener('change', (e) => {
    sizeGame = +e.target.value;
    // getRestartGame(size);
  });

  playPauseGame.addEventListener('click', () => {
    openMenu();
    isPlayPause = true;
    setInterval(tick(isPlayPause), 1000);
  });

  saveGame.addEventListener('click', () => saveGamePlay(saveObj, sizeGame));
  restartGame.addEventListener('click', () => getRestartGame(oldSize));

  newGame.addEventListener('click', () => {
    getRestartGame(sizeGame);
    oldSize = sizeGame;
    openMenu();
    isPlayPause = true;
    setInterval(tick(isPlayPause), 1000);
    // buildCell(randomArray, size);
  });

  continueGame.addEventListener('click', () => {
    openMenu();
    isPlayPause = false;
    setInterval(tick(isPlayPause), 1000);
  });

  settings.addEventListener('click', () => getSizeGame());
  loadGame.addEventListener('click', () => {
    downloadGame(saveObj);
  });

  field.addEventListener('mousedown', mouseMoveCell);
}

document.addEventListener('DOMContentLoaded', init());
