class App {
  // управляет приложением, работает с данными, управляет приложением
  state = {
    page: 0, // на какой странице нахожусь
    currentCard: 0, // текущая карточка
    play: false, // активирован ли режим игры
    playActive: false, // началась ли игра
    randomArr: [], //
    errors: 0, // количество ошибок
    endGame: false, // заончилась ли игра
  };

  getRandomArr() {
    return [...Array(8).keys()].sort(() => Math.random() - 0.5);
  }

  shuffle(arr) {
    var tmp,
      current,
      top = array.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
  }
}
