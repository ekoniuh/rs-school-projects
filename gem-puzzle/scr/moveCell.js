import state from "./state";
import { saveScores } from "./getLocalStorage";
import { field, time, counterStep, volumeBtn } from "./renderContent";
import { setSaveScores } from "./setLocalStorage";

const createHandleVolumeState = () => {
  volumeBtn.classList.toggle("volume-on");
  state.isSoundOnOff = !state.isSoundOnOff;
};

volumeBtn.addEventListener("click", () =>
  createHandleVolumeState(state.isSoundOnOff)
);

function volume() {
  if (state.isSoundOnOff) {
    const audio = document.querySelector(".audio-play");
    audio.src = "./assets/audio.mp3";
    audio.pause();
    audio.play();
  }
}

function move(index, widthCell) {
  const cell = state.cells[index];
  const leftDiff = Math.abs(state.empty.left - cell.left);
  const topDiff = Math.abs(state.empty.top - cell.top);
  const emptyLeft = state.empty.left;
  const emptyTop = state.empty.top;

  if (leftDiff + topDiff > 1) {
    cell.element.style.left = `${cell.left * widthCell}px`;
    cell.element.style.top = `${cell.top * widthCell}px`;
    return;
  }
  volume(state.isSoundOnOff);

  state.counterMove += 1;
  counterStep.innerHTML = state.counterMove;

  cell.element.style.left = `${state.empty.left * widthCell}px`;
  cell.element.style.top = `${state.empty.top * widthCell}px`;

  state.empty.left = cell.left;
  state.empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  const isFinished = state.cells.every((item) => {
    if (!item.value && item.top === state.sizeGame - 1) {
      return true;
    }
    if (item.value) {
      return item.value === item.top * state.sizeGame + item.left + 1;
    }
    return item.value === item.top * state.sizeGame + item.left;
  });

  if (isFinished) {
    setSaveScores(saveScores);
    setTimeout(() => {
      // eslint-disable-next-line no-alert
      alert(
        `Ура! Вы решили головоломку за ${time.innerHTML} и ${state.counterMove} ходов`
      );
    }, 500);
  }
}

function mouseMoveCell(event) {
  const { target } = event;
  if (!target.classList.contains("field-item")) {
    return;
  }

  const shiftCurX = event.layerX;
  const shiftCurY = event.layerY;
  const fieldLeft = field.getBoundingClientRect().left;
  const fieldTop = field.getBoundingClientRect().top;
  function moveAt(clientX, clientY) {
    target.classList.add("field-item_animation");
    target.style.left = `${clientX - fieldLeft - shiftCurX}px`;
    target.style.top = `${clientY - fieldTop - shiftCurY}px`;
  }

  moveAt(event.clientX, event.clientY);

  function onMouseMove(mouseEvent) {
    moveAt(mouseEvent.clientX, mouseEvent.clientY);
  }

  document.addEventListener("mousemove", onMouseMove);

  field.onmouseup = () => {
    // state.counterMove += 1;
    document.removeEventListener("mousemove", onMouseMove);
    target.onmouseup = null;
    target.classList.remove("field-item_animation");
  };
}
export { move, mouseMoveCell };
