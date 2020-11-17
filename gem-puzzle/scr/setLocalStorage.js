import { saveObj, saveScores } from './getLocalStorage';
import state from './state';
import { time, counterStep } from './renderContent';

function setSaveGame() {
  saveObj.timer.push(time.innerHTML);
  saveObj['move counter'].push(+counterStep.innerHTML);
  saveObj['Board size'].push(state.sizeGame);
  saveObj['array cells'].push(state.cells);
  saveObj.empty.push(state.empty);

  localStorage.setItem('itemCache', JSON.stringify(saveObj));
}

function setSaveScores() {
  const date = new Date();
  const todayFinished = date.toLocaleDateString();
  const timeFinished = date.toLocaleTimeString();
  saveScores.date.push([timeFinished, todayFinished]);
  saveScores.time.push(time.innerHTML);
  saveScores.move.push(+counterStep.innerHTML);
  saveScores.size.push(state.sizeGame);
  localStorage.setItem('bestScores', JSON.stringify(saveScores));
}

export { setSaveGame, setSaveScores };
