import state from "./state";
import { time } from "./renderContent";

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

export default tick;
