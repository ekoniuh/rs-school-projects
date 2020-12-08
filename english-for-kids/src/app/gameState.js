// import cardsData from 'data/cards';
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
    this.saveStats();
  }

  sortStatistic(word) {
    this.stats.sort((a, b) => (a[`${word}`] < b[`${word}`] ? 1 : -1));
    // this.stats.sort((a, b) => a[`${word}`] - b[`${word}`]);
    this.saveStats();
  }

  sortReverseStatistic() {
    this.stats.reverse();
    this.saveStats();
  }

  getStats() {
    this.stats = JSON.parse(localStorage.getItem('gameState')) || statisticData;
  }
}

export default new GameState();
