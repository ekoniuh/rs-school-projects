import state from './state';
import getRestartGame from './restartGame';

import { saveObj } from './getLocalStorage';
import {
  sizeField,
  restartGame,
  field,
  time,
  continueGame,
  menu,
  playPauseGame,
  newGame,
  settings,
  saveGame,
  loadGame,
  bestScores,
  fieldSizeDisplay,
  menuList,
} from './renderContent';
import { renderMenuDownloadGame, nextBackSaveItem } from './menuDownloadGame';
import { buildCell, buildCellDownload } from './renderCell';
import { setSaveGame } from './setLocalStorage';
import { mouseMoveCell } from './moveCell';
import createSaveScores from './renderSaveScores';
import '../style.css';

state.cells.push(state.empty);
// +
// function buildCell(randomArray, size) {
//   const widthCell = field.offsetWidth / size;
//   const heightCell = field.offsetHeight / size;

//   field.style.gridTemplateColumns = `repeat(${size}, 1fr);`;
//   for (let i = 1; i < size * size; i += 1) {
//     const cell = document.createElement('div');
//     cell.className = 'field-item';

//     const value = randomArray[i - 1] + 1;
//     cell.innerHTML = value;

//     const left = i % size;
//     const top = (i - left) / size;

//     state.cells.push({
//       value,
//       left,
//       top,
//       element: cell,
//     });

//     cell.style.left = `${left * widthCell}px`;
//     cell.style.top = `${top * widthCell}px`;

//     field.append(cell);
//     cell.style.width = `${widthCell}px`;
//     cell.style.height = `${heightCell}px`;

//     cell.addEventListener('click', () => {
//       move(i, widthCell);
//     });
//   }
// }
// // render cell Download
// // +
// function buildCellDownload({ size, arrayCells, index }) {
//   time.innerHTML = saveObj.timer[index];
//   state.min = +saveObj.timer[index].substr(0, 2);
//   state.sec = +saveObj.timer[index].substr(3, 2);
//   state.counterMove = +saveObj['move counter'][index];
//   counterStep.innerHTML = saveObj['move counter'][index];

//   field.innerHTML = '';
//   let randomArray = [];
//   state.cells = [];

//   randomArray = arrayCells.map((item) => item.value);
//   const widthCell = field.offsetWidth / size;
//   const heightCell = field.offsetHeight / size;

//   field.style.gridTemplateColumns = `repeat(${size}, 1fr);`;
//   for (let i = 1; i < size * size; i += 1) {
//     const cell = document.createElement('div');
//     cell.className = 'field-item';
//     cell.innerHTML = randomArray[i];

//     state.cells.push({
//       value: randomArray[i],
//       left: arrayCells[i].left,
//       top: arrayCells[i].top,
//       element: cell,
//     });

//     cell.style.left = `${arrayCells[i].left * widthCell}px`;
//     cell.style.top = `${arrayCells[i].top * widthCell}px`;

//     field.append(cell);

//     cell.style.width = `${widthCell}px`;
//     cell.style.height = `${heightCell}px`;

//     cell.addEventListener('click', () => {
//       move(i - 1, widthCell);
//     });
//   }
//   Array.from(document.querySelectorAll('.field-item')).forEach((item) => {
//     const newItem = item;
//     newItem.style.fontSize = size > 6 ? '25px' : '50px';
//   });
// }
// -
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
// +
// function getRestartGame(size) {
//   const newRandomArray = [...Array(size * size - 1).keys()].sort(
//     () => Math.random() - 0.5
//   );

//   state.rotate += 360;
//   restartGame.style.transform = `rotate(-${state.rotate}deg)`;
//   field.innerHTML = '';
//   state.min = 0;
//   state.sec = 0;
//   state.counterMove = 0;
//   counterStep.innerHTML = 0;
//   state.empty = {
//     value: 0,
//     top: 0,
//     left: 0,
//   };
//   state.cells = [];
//   state.cells.push(state.empty);
//   buildCell(newRandomArray, size);
//   document
//     .querySelectorAll('.field-item')
//     .forEach((item) => (item.style.fontSize = size > 6 ? '25px' : '50px'));

//   // Как исправить, не получилось ко всем элементам применить
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

// menu
// +

function tick() {
  if (!state.isPlayPause) {
    return;
  }

  if (state.sec > 59) {
    state.min += 1;
    state.sec = 0;
    return;
  }
  if (state.sec < 10 && state.min < 10) {
    time.innerHTML = `0${state.min}:0${state.sec}`;
  } else if (state.sec > 9 && state.min < 10) {
    time.innerHTML = `0${state.min}:${state.sec}`;
  } else {
    time.innerHTML = `${state.min}:${state.sec}`;
  }

  state.sec += 1;
}

function init() {
  // debugger;
  const randomArray = [
    ...Array(state.sizeGame * state.sizeGame - 1).keys(),
  ].sort(() => Math.random() - 0.5);

  // надо ли создавать такой же объект или просто сдлеать его null

  setInterval(() => tick(state.isPlayPause), 1000);

  buildCell(randomArray, state.sizeGame);

  sizeField.addEventListener('change', (e) => {
    state.sizeGame = +e.target.value;
  });

  playPauseGame.addEventListener('click', () => {
    openMenu();
    state.isPlayPause = true;
    setInterval(tick(state.isPlayPause), 1000);
  });

  saveGame.addEventListener('click', () => {
    saveGame.classList.add('save-game__btn');
    setTimeout(() => {
      saveGame.classList.remove('save-game__btn');
    }, 1000);
    setSaveGame(saveObj, state.sizeGame, state.cells);
  });

  restartGame.addEventListener('click', () => getRestartGame(state.oldSize));

  newGame.addEventListener('click', () => {
    getRestartGame(state.sizeGame);
    state.oldSize = state.sizeGame;
    openMenu();
    state.isPlayPause = true;
    setInterval(tick(state.isPlayPause), 1000);
  });

  continueGame.addEventListener('click', () => {
    openMenu();
    state.isPlayPause = false;
    setInterval(tick(state.isPlayPause), 1000);
  });

  settings.addEventListener('click', getSizeGame);

  loadGame.addEventListener('click', () => {
    renderMenuDownloadGame(saveObj);
    const arrSaveItems = Array.from(
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
      const index = +itemDownload.dataset.index;
      state.empty = saveObj.empty[index];
      buildCellDownload({
        size: saveObj['Board size'][index],
        arrayCells: saveObj['array cells'][index],
        index,
      });
    });
  });

  bestScores.addEventListener('click', () => {
    createSaveScores();
  });

  field.addEventListener('mousedown', (e) => mouseMoveCell(e));
}

document.addEventListener('DOMContentLoaded', init());
