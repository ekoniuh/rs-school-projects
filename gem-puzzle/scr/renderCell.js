import { field, time, counterStep } from './renderContent';
import state from './state';
import { move } from './moveCell';
import { saveObj } from './getLocalStorage';
import { changeSizeFonts } from './utils';
//+
function buildCell(randomArray, size) {
  const widthCell = field.offsetWidth / size;
  const heightCell = field.offsetHeight / size;

  field.style.gridTemplateColumns = `repeat(${size}, 1fr);`;
  for (let i = 1; i < size * size; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'field-item';

    const value = randomArray[i - 1] + 1;
    cell.innerHTML = value;

    const left = i % size;
    const top = (i - left) / size;

    state.cells.push({
      value,
      left,
      top,
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
// render cell Download
// +
function buildCellDownload({ size, arrayCells, index }) {
  time.innerHTML = saveObj.timer[index];
  state.min = Number(saveObj.timer[index].substr(0, 2));
  state.sec = Number(saveObj.timer[index].substr(3, 2));
  state.counterMove = Number(saveObj['move counter'][index]);
  counterStep.innerHTML = saveObj['move counter'][index];

  field.innerHTML = '';
  let randomArray = [];
  state.cells = [];

  randomArray = arrayCells.map((item) => item.value);
  const widthCell = field.offsetWidth / size;
  const heightCell = field.offsetHeight / size;

  field.style.gridTemplateColumns = `repeat(${size}, 1fr);`;
  for (let i = 1; i < size * size; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'field-item';
    cell.innerHTML = randomArray[i];

    state.cells.push({
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

  changeSizeFonts(size);
}

export { buildCell, buildCellDownload };
