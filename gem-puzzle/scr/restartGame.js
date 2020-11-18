import state from './state';
import { buildCell } from './renderCell';
import { restartGame, field, counterStep } from './renderContent';
//+
function getRestartGame(size) {
  const newRandomArray = [...Array(size * size - 1).keys()].sort(
    () => Math.random() - 0.5
  );

  state.rotate += 360;
  restartGame.style.transform = `rotate(-${state.rotate}deg)`;
  field.innerHTML = '';
  state.min = 0;
  state.sec = 0;
  state.counterMove = 0;
  counterStep.innerHTML = 0;
  state.empty = {
    value: 0,
    top: 0,
    left: 0,
  };
  state.cells = [];
  state.cells.push(state.empty);
  buildCell(newRandomArray, size);
  Array.from(document.querySelectorAll('.field-item')).forEach((item) => {
    const newItem = item;
    newItem.style.fontSize = size > 6 ? '25px' : '50px';
  });
  
}

export default getRestartGame;
