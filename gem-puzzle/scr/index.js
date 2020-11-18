import state from './state';
import tick from './tick';
import openMenu from './openMenu';

import getRestartGame from './restartGame';

import { saveObj } from './getLocalStorage';
import {
  sizeField,
  restartGame,
  field,
  continueGame,
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

function getSizeGame() {
  settings.classList.toggle('menu-item__anime');
  if (fieldSizeDisplay.style.display === 'block') {
    fieldSizeDisplay.style.display = 'none';
    return;
  }
  fieldSizeDisplay.style.display = 'block';
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
