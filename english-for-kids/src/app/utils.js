function onChangeCardStyle() {
  const cardGame = document.querySelectorAll('');
  cardGame.array.forEach((element) => {
    element.classList.toggle;
  });
}

function createIndicator(answer) {
  const indicator = document.createElement('div');
  indicator.classList.add();
  return indicator;
}

export function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
  // for (let i = arr.length - 1; i > 0; i++) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [arr[i], arr[j]] = [arr[j], arr[i]];
  // }
  // return arr;
}
