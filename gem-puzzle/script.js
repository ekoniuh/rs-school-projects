let isMenuShow = true,
  isPlayPause = true,
  isSoundOnOff = true;
let sizeGame = 4;
let oldSize = 4;
let cells = [];

let randomArray = [];
let sec = 0,
  min = 0,
  counterMove = 0,
  rotate = 0;
let empty = {
  value: 0,
  top: 0,
  left: 0,
};

let saveScores = {
  date: [],
  'Move Size': [],
  time: [],
};

cells.push(empty);

function createContent() {
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
        <div class="volume"></div>		
			</div>
			<div class="field">
			</div>
			<audio src="./assets/audio.mp3" class="audio-play" type="audio/mp3"></audio>
		</div>
	</section>`
  );
}
createContent();

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
const menuWrapper = document.querySelector('.menu-wrapper');
const menuList = document.querySelector('.menu-list');

function move(index, widthCell) {
  const cell = cells[index];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);
  const emptyLeft = empty.left;
  const emptyTop = empty.top;

  if (leftDiff + topDiff > 1) {
    cell.element.style.left = `${cell.left * widthCell}px`;
    cell.element.style.top = `${cell.top * widthCell}px`;
    return;
  }
  volume(isSoundOnOff);

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

    // правильное ли решение
  });

  if (isFinished) {
    setSaveScores(saveScores);
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

function volume(isSoundOnOff) {
  if (isSoundOnOff) {
    const audio = document.querySelector('.audio-play');
    audio.src = './assets/audio.mp3';
    audio.pause();
    audio.play();
  }
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
    // counterMove += 1;
    document.removeEventListener('mousemove', onMouseMove);
    event.target.onmouseup = null;
    event.target.style.transitionDuration = '0.3s';
  };
}

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

function setSaveGame(saveObj, sizeGame, cells) {
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

function setSaveScores(saveScores) {
  let date = new Date();
  let todayFinished = date.toLocaleDateString();
  let timeFinished = date.toLocaleTimeString();
  saveScores['date'].push([timeFinished, todayFinished]);
  saveScores['time'].push(time.innerHTML);
  saveScores['Move Size'].push(sizeGame);
  localStorage.setItem('bestScores', JSON.stringify(saveScores));
}

function createSaveScores(saveScores) {
  if (document.querySelector('.best-scores__box')) {
    document.querySelector('.best-scores__box').remove();
  }

  menuList.style.left = '-300px';

  setTimeout(() => {
    menuList.style.display = 'none';
  }, 1000);

  menu.style.left = '0px';
  menuWrapper.classList.toggle('menu-scores__change');

  setTimeout(() => {
    createScoresList(saveScores);

    document
      .querySelector('.menu-back__button_scores')
      .addEventListener('click', () => {
        menuList.style.display = 'flex';
        setTimeout(() => {
          menuList.style.left = '0px';
        }, 300);
        menu.style.left = '-125px';
        menuWrapper.classList.toggle('menu-scores__change');

        document.querySelector('.best-scores__box').style.left = '-100px';
        document.querySelector('.best-scores__box').style.display = 'none';
      });
  }, 1000);

  // const div = document.createElement('div');
  // div.className = 'best-scores';
  // document.querySelector('.menu-wrapper').append(div);

  // const h2 = document.createElement('h2');
  // h2.className = 'best-scores__title';
  // h2.innerText = 'Best scores';
  // // document.querySelector('.menu-wrapper').append(h2);
  // div.append(h2);

  // const h3 = document.createElement('h3');
  // h3.className = 'scores-title__description';
  // h3.innerText = 'Date Moves Size Time';
  // div.append(h3);

  // const ul = document.createElement('ul');
  // ul.className = 'scores-list';
  // div.append(ul);
}

function createScoresList(saveScores) {
  menuWrapper.insertAdjacentHTML(
    'beforeEnd',
    `<div class="best-scores__box">
        <button class="menu-back__button_scores"></button>
        <h2 class="best-scores__title">Best scores</h2>
        <h3 class="scores-title__description">
            <span class="scores-title__date">
              Date
            </span>
            <span class="scores-title__moves-size">
             Moves Size
            </span>
            <span class="scores-title__time">
             Time
             </span>
          </h3>     
      <ul class="scores-list">
      </ul>
  </div>`
  );

  for (let i = 0; i < saveScores.time.length; i++) {
    document.querySelector('.scores-list').insertAdjacentHTML(
      'beforeEnd',
      `<li class="scores-list__item" data-index = ${i}>
        <span class="scores-title__date">
        <span class="score-item__numbering"> ${i + 1} </span>
         <span class="score-item__hour">${saveScores.date[i][0]}</span> </br> 
      <span class="score-item__date">${saveScores.date[i][1]}
        </span></span>
        <span class="scores-title__moves-size">
        ${saveScores['Move Size'][i]}
        </span>
        <span class="scores-title__time">
        ${saveScores.time[i]}
        </span>
      </li>`
    );
  }
}

function menuDownloadGame(saveObj) {
  menuList.style.left = '-204px';
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
      }
    : JSON.parse(localStorage.getItem('itemCache'));
}

function getSaveScores() {
  return JSON.parse(localStorage.getItem('bestScores')) === null
    ? {
        date: [],
        'Move Size': [],
        time: [],
      }
    : JSON.parse(localStorage.getItem('bestScores'));
}

function init() {
  let randomArray = [...Array(sizeGame * sizeGame - 1).keys()].sort(
    () => Math.random() - 0.5
  );

  saveObj = getSaveGame();
  saveScores = getSaveScores();

  // надо ли создавать такой же объект или просто сдлеать его null

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
    saveGame.classList.add('save-game__btn');
    setTimeout(() => {
      saveGame.classList.remove('save-game__btn');
    }, 1000);
    setSaveGame(saveObj, sizeGame, cells);
  });

  restartGame.addEventListener('click', () => getRestartGame(oldSize));

  newGame.addEventListener('click', () => {
    getRestartGame(sizeGame);
    oldSize = sizeGame;
    openMenu();
    isPlayPause = true;
    setInterval(tick(isPlayPause), 1000);
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

    // переменную надо ли закидывать
    document
      .querySelector('.menu-back__button')
      .addEventListener('click', () => {
        document.querySelector('.save-list__box').style.display = 'none';
        menuList.style.left = '0px';
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
    createSaveScores(saveScores);
  });

  document.querySelector('.volume').addEventListener('click', () => {
    document.querySelector('.volume').classList.toggle('volume-on');
    isSoundOnOff = !isSoundOnOff;
  });
  field.addEventListener('mousedown', mouseMoveCell);
}

document.addEventListener('DOMContentLoaded', init());
