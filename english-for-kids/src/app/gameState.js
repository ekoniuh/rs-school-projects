// import cardsData from 'data/cards';
import statisticData from '../data/statisticsData';

export default class GameState {
  constructor() {
    this.stats = JSON.parse(localStorage.getItem('gameState')) || statisticData;
  }

  saveStats() {
    localStorage.setItem('gameState', JSON.stringify(this.stats));
  }

  resetStats() {
    this.stats = statisticData.forEach((item) => {
      item.clicks = 0;
      item.correct = 0;
      item.wrong = 0;
      item.errors = 0;
    });

    this.saveStats();
  }

  setStatistic(field, word) {
    // TODO
    const itemWord = this.stats.find((item) => item.word === word);
    itemWord[`${field}`] += 1;
    // console.log(statisticData[index].clicks);
    // statisticData.forEach((item, index) => {
    //   if (item.word === word) {
    //     const obj = statisticData[index];
    // }
    // });
    this.saveStats();
  }

  // trainClick(text) {
  //   this.plusClisk(text, 'trainClick');
  // }

  // correctClick(text) {
  //   this.plusClisk(text, 'correctClick');
  // }

  // errorClick() {
  //   this.plusClisk(text, 'errorClick');
  // }
}
