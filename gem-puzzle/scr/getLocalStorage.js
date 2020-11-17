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
// +
function getSaveScores() {
  return JSON.parse(localStorage.getItem('bestScores')) === null
    ? {
        date: [],
        move: [],
        size: [],
        time: [],
      }
    : JSON.parse(localStorage.getItem('bestScores'));
}

const saveObj = getSaveGame();
const saveScores = getSaveScores();

export { saveObj, saveScores };
