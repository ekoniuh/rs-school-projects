import state from "./state";
import { buildCell } from "./renderCell";
import { restartGame, field, counterStep } from "./renderContent";
import { getRandomArray, changeSizeFonts } from "./utils";

function getRestartGame(size) {
  state.rotate += 360;
  restartGame.style.transform = `rotate(-${state.rotate}deg)`;
  field.innerHTML = "";
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
  buildCell(getRandomArray(), size);
  changeSizeFonts(size);
}

export default getRestartGame;
