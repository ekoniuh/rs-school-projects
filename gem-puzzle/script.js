// const cellSize = null;
let isMenuShow = true,
  isPlayPause = true;
let sizeGame = 4;
let oldSize = 4;
let cells = [];

let randomArray = [];
let sec = 0,
  min = 0,
  counterMove = 0,
  rotate = 0;
const empty = {
  value: 0,
  top: 0,
  left: 0,
};

const saveScores = {
  date: [],
  'Move Size': [],
  Time: [],
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
					<span class="timer">00:00</span>
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
  counterStep.innerHTML = counterMove;

  cell.element.style.left = `${empty.left * widthCell}px`;
  cell.element.style.top = `${empty.top * widthCell}px`;

  empty.left = cell.left;
  empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

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

function buildCell(array, size) {
  if (!array) {
    randomArray = [...Array(size * size - 1).keys()].sort(
      () => Math.random() - 0.5
    );
  }

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
    menu.classList.toggle('menu_opacity');

    document
      .querySelector('.content-box')
      .classList.toggle('content-box__scale');
  } else {
    menu.classList.toggle('menu_opacity');
    menu.style.left = '-391px';

    document
      .querySelector('.content-box')
      .classList.toggle('content-box__scale');
  }
}

function mouseMoveCell(event) {
  if (!event.target.classList.contains('field-item')) {
    return;
  }

  // let left = event.target.getBoundingClientRect().left;
  // let left = event.clientX - field.getBoundingClientRect().left - event.layerX;
  // let top = event.target.getBoundingClientRect().top;
  // console.log(left);
  // console.log(top);

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

  field.onmouseup = function (event) {
    // if (event.target.offsetLeft < 0) {
    //   event.target.style.left = left + 'px';
    //   event.target.style.top = top + 'px';
    //   console.log(+event.target.style.left);
    //   console.log(event.target.offsetLeft);
    // }

    document.removeEventListener('mousemove', onMouseMove);
    event.target.onmouseup = null;
    event.target.style.transitionDuration = '0.3s';
  };

  // event.target.addEventListener('dragstart', () => false);
}
let cellAvalibleOnDrag = true;
// function mouseMoveCell(event) {
//   if (cellAvalibleOnDrag) {
//     let shiftX = event.clientX - event.target.getBoundingClientRect().left;
//     let shiftY = event.clientY - event.target.getBoundingClientRect().top;

//     moveAt(event.pageX, event.pageY);

//     function moveAt(pageX, pageY) {
//       event.target.style.left = pageX - field.offsetLeft - shiftX + 'px';
//       event.target.style.top =
//         pageY - field.offsetParent.offsetTop - shiftY + 'px';
//     }

//     function onMouseMove(event) {
//       moveAt(event.pageX, event.pageY);
//     }

//     document.addEventListener('mousemove', onMouseMove);

//     event.target.onmouseup = function () {
//       document.removeEventListener('mousemove', onMouseMove);
//       event.target.onmouseup = null;
//       cellAvalibleOnDrag = true;
//     };
//   }
//   cellAvalibleOnDrag = false;
// }

function getSizeGame() {
  settings.classList.toggle('menu-item__anime');
  if (fieldSizeDisplay.style.display === 'block') {
    fieldSizeDisplay.style.display = 'none';
    return;
  }
  fieldSizeDisplay.style.display = 'block';
}

// НАДО ЛИ СОЗДАВАТЬ ОБЪЕКТ ПУСТОЙ

function buildCellDownload(size, arrayCells, index) {
  time.innerHTML = saveObj.timer[index];
  min = +saveObj.timer[index].substr(0, 2);
  sec = +saveObj.timer[index].substr(3, 2);
  counterMove = +saveObj['move counter'][index];
  counterStep.innerHTML = saveObj['move counter'][index];

  field.innerHTML = '';
  let randomArray = [];
  cells = [];

  randomArray = arrayCells.map((item) => item.value);
  let widthCell = field.offsetWidth / size;
  let heightCell = field.offsetHeight / size;

  field.style.gridTemplateColumns = `repeat(${size}, 1fr);`;
  for (let i = 1; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.className = 'field-item';
    cell.innerHTML = randomArray[i];

    cells.push({
      value: randomArray[i],
      left: arrayCells[i].left,
      top: arrayCells[i].top,
      element: cell,
    });

    cell.style.left = `${arrayCells[i].left * widthCell}px`;
    cell.style.top = `${arrayCells[i].top * widthCell}px`;

    field.append(cell);

    cell.style.width = `${widthCell}px`;
    cell.style.height = `${heightCell}px`;

    cell.addEventListener('click', () => {
      move(i - 1, widthCell);
    });
  }
  document
    .querySelectorAll('.field-item')
    .forEach((item) => (item.style.fontSize = size > 6 ? '25px' : '50px'));
}

function saveGamePlay(saveObj, sizeGame, cells) {
  if (isPlayPause) {
    // по клику постоянно записывает
  }

  saveObj['timer'].push(time.innerHTML);
  saveObj['move counter'].push(+counterStep.innerHTML);
  saveObj['Board size'].push(sizeGame);
  saveObj['array cells'].push(cells);
  saveObj['empty'].push(empty);

  localStorage.setItem('itemCache', JSON.stringify(saveObj));
}

function menuDownloadGame(saveObj) {
  document.querySelector('.menu-list').style.left = '-204px';
  if (!!document.querySelector('.save-list')) {
    document.querySelector('.save-list').innerHTML = '';
    document.querySelector('.save-list__box').remove();
  }

  const div = document.createElement('div');
  div.className = `save-list__box`;
  document.querySelector('.menu-wrapper').append(div);

  const ul = document.createElement('ul');
  ul.className = `save-list`;
  document.querySelector('.save-list__box').append(ul);

  const buttonMenuBack = document.createElement('button');
  buttonMenuBack.className = 'menu-back__button';
  document.querySelector('.save-list__box').append(buttonMenuBack);

  const buttonDownload = document.createElement('button');
  buttonDownload.className = 'download-button';
  document.querySelector('.save-list__box').append(buttonDownload);

  for (let i = 0; i < saveObj.timer.length; i++) {
    document.querySelector('.save-list').insertAdjacentHTML(
      'beforeEnd',
      `<li class="save-list__item" data-index = ${i}>
				<div class="save-item__name">
          <img src="./assets/55899ca177a419ff0334fd84_Arrow10.png" alt="back-save-item" title="back-save-item" class="back-save__item" data-index = ${i}>
          <span	class="save-title">Save Game - <span>${i + 1}</span></span>
					<img src="./assets/55899ca177a419ff0334fd84_Arrow10.png" alt="next-save-item" title="next-save-item" class="next-save__item"  data-index = ${i}>
				</div>
				<div class="save-item__description">
					<span class="board-size__load">Board size: ${saveObj['Board size'][i]}x${
        saveObj['Board size'][i]
      }</span>
					<span class="time-game__load">time ${saveObj.timer[i]}</span>
					<span class="move-game__load">move  ${saveObj['move counter'][i]}</span>
				</div>
			</li>`
    );

    document.querySelector('.save-list__box').style.display = 'block';

    if (i === 0) {
      document
        .querySelector('.save-list__item')
        .classList.add('save-list__item_active');
    }
  }

  setInterval(
    () => (document.querySelector('.save-list__box').style.left = '0px'),
    1000
  );
}

function nextBackSaveItem(target, arrSaveItems) {
  let index = +target.dataset.index;
  if (
    target.className === 'next-save__item' &&
    index !== arrSaveItems.length - 1
  ) {
    arrSaveItems[+index].classList.remove('save-list__item_active');
    arrSaveItems[+index + 1].classList.add('save-list__item_active');
  }

  if (target.className === 'back-save__item' && index !== 0) {
    arrSaveItems[+index].classList.remove('save-list__item_active');
    arrSaveItems[+index - 1].classList.add('save-list__item_active');
  }
}

function getSaveGame() {
  return JSON.parse(localStorage.getItem('itemCache')) === null
    ? {
        timer: [],
        'move counter': [],
        'Board size': [],
        'array cells': [],
        empty: [],
        // 'best scores': [],
      }
    : JSON.parse(localStorage.getItem('itemCache'));
}

function init() {
  let randomArray = [...Array(sizeGame * sizeGame - 1).keys()].sort(
    () => Math.random() - 0.5
  );

  saveObj = getSaveGame();
  setInterval(() => tick(isPlayPause), 1000);

  buildCell(randomArray, sizeGame);

  sizeField.addEventListener('change', (e) => {
    sizeGame = +e.target.value;
  });

  playPauseGame.addEventListener('click', () => {
    openMenu();
    isPlayPause = true;
    setInterval(tick(isPlayPause), 1000);
  });

  saveGame.addEventListener('click', () => {
    saveGamePlay(saveObj, sizeGame, cells);
  });

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

  settings.addEventListener('click', getSizeGame);

  loadGame.addEventListener('click', () => {
    menuDownloadGame(saveObj);
    let arrSaveItems = Array.from(
      document.querySelectorAll('.save-list__item')
    );

    document
      .querySelector('.save-list')
      .addEventListener('click', ({ target }) =>
        nextBackSaveItem(target, arrSaveItems)
      );

    document
      .querySelector('.menu-back__button')
      .addEventListener('click', () => {
        document.querySelector('.save-list__box').style.display = 'none';
        document.querySelector('.menu-list').style.left = '0px';
      });

    document.querySelector('.download-button').addEventListener('click', () => {
      const itemDownload = document.querySelector('.save-list__item_active');
      let index = +itemDownload.dataset.index;
      empty = saveObj['empty'][index];
      buildCellDownload(
        saveObj['Board size'][index],
        saveObj['array cells'][index],
        index
      );
    });
  });

  bestScores.addEventListener('click', () => {
    let date = new Date();
    let todayFinished = date.toLocaleDateString();
    let timeFinished = date.toLocaleTimeString();
    saveScores['date'].push([timeFinished, todayFinished]);
    saveScores['Time'].push(time.innerHTML);
    saveScores['Move Size'].push(sizeGame);
    localStorage.setItem('best scores', JSON.stringify(saveScores));
    const obj = JSON.parse(localStorage.getItem('itemCache'));

    document.querySelector('.menu-list').style.left = '-204px';
    setTimeout(() => {
      document.querySelector('.menu-list').style.display = 'none';
    }, 1000);
  });

  field.addEventListener('mousedown', mouseMoveCell);
}

document.addEventListener('DOMContentLoaded', init());
