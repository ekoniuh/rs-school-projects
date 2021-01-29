import statisticData from '../data/statisticsData';
class GameState {
  constructor() {
    this.stats = JSON.parse(localStorage.getItem('gameState')) || statisticData;
  }

  saveStats() {
    localStorage.setItem('gameState', JSON.stringify(this.stats));
  }

  resetStats() {
    this.stats = statisticData;

    this.saveStats();
  }

  setStatistic(field, word) {
    let indexItem = 0;
    this.stats.forEach((item, index) => {
      if (item.word === word) {
        indexItem = index;
      }
    });

    this.stats[indexItem][`${field}`] += 1;
    this.calcErrors(indexItem, field);
    this.saveStats();
  }

  sortStatistic(word) {
    this.stats.sort((a, b) => (a[`${word}`] < b[`${word}`] ? 1 : -1));
    this.saveStats();
  }

  sortReverseStatistic() {
    this.stats.reverse();
    this.saveStats();
  }

  calcErrors(indexItem) {
    this.stats[indexItem].errors = Math.round(
      (this.stats[indexItem].wrong /
        (this.stats[indexItem].wrong + this.stats[indexItem].correct)) *
        100,
    );
    this.saveStats();
  }

  getStats() {
    this.stats = JSON.parse(localStorage.getItem('gameState')) || statisticData;
  }
}

export default new GameState();
