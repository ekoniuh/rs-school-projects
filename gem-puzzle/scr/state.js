const state = {
  isMenuShow: true,
  isPlayPause: true,
  isSoundOnOff: true,
  sizeGame: 4,
  oldSize: 4,
  cells: [],
  sec: 0,
  min: 0,
  counterMove: 0,
  rotate: 0,
  empty: {
    value: 0,
    top: 0,
    left: 0,
  },
};
// state.cells.push(state.empty);
export default state;
