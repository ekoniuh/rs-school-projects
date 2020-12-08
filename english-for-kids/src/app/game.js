import { playAudio } from './audio';
import {
  buttonMenu,
  hamburgerMenu,
  categoryContainer,
  state,
  navigation,
  logo,
  answersContainer,
  startButton,
  repeatButton,
  mainPage,
  statisticButton,
} from './state';
import { shuffle } from './utils';
import checkedStatistic from './statistic';
import GameState from './gameState';
const gameState = new GameState();
export default class Game {
  startGame() {
    const word = state.wordGameArray[state.wordGameArray.length - 1];
    setTimeout(() => {
      playAudio(word);
    }, 1000);
  }

  checkedWord(card, wordPlay) {
    const { word } = card.dataset;
    if (state.wordGameArray.length > 0) {
      if (word === wordPlay) {
        this.correctAnswer(card);
        gameState.setStatistic('correct', word);
      } else {
        this.errorAnswer();
        gameState.setStatistic('wrong', word);
      }
    }
  }

  correctAnswer(card) {
    playAudio('correct');
    card.dataset.checked = true;
    card.classList.toggle('category-card_train');

    const img = document.createElement('img');
    img.className = 'correct-answer';
    img.src = './assets/images/answers/correct/correct.jpg';
    img.alt = 'correct-answer';
    repeatButton.after(img);

    state.wordGameArray.pop();
    this.startGame();
    if (!state.wordGameArray.length) {
      if (!state.errors) {
        this.finishGame('success');
      } else {
        this.finishGame('error');

        const h2 = document.createElement('h2');
        h2.className = 'sum-errors';
        h2.innerHTML = 'ERORROS:' + state.errors;
        document.querySelector('.error').after(h2);
      }
    }
  }

  errorAnswer() {
    state.errors += 1;
    playAudio('error');
    const img = document.createElement('img');
    img.className = 'error-answer';
    img.src = './assets/images/answers/error/error.jpg';
    img.alt = 'error-answer';
    repeatButton.before(img);
  }

  finishGame(win) {
    document.querySelector('.cards').innerHTML = '';
    const div = document.createElement('div');
    div.className = `${win}`;

    document.querySelector('.category').before(div);

    setTimeout(() => {
      document.querySelector(`.${win}`).remove();
      // FIXME
      document.querySelector('.sum-errors').remove();
      document.querySelector('.category').classList.toggle('category_none');
    }, 2000);
  }

  //   gameOver(){
  // 	isGameStart = true;
  // 	if(errorsCount){
  // 		playSound('./.....');
  // 		title.textContent= ...;

  // 		setTimeout(() => {
  // 			renderMainPage();

  // 		}, 1000);
  // 	}
  // }

  // startGame() {
  //   if (isGameStart && state.gameArray.length) {
  //     playAudio(state.gameArray[state.gameArray.length - 1]);
  //   } else {
  //     // state.play = !state.play;
  //     isGameStart = true;
  //     // errorsCount = 0;
  //     // buttonStart.classList.add('change button');
  //     // buttonStart.setAttribute('title', 'Repeat'); // повторение саунд
  //     state.gameArray = shuffle(state.gameArray);
  //     // playSound(последние элемент в массиве плэй)
  //   }
  // }

  // repeatWords(){
  // 	const categotyChecked = document.querySelector('in').nodeValue;
  // 	if(categotyChecked === 'all'){
  // 		cardsArray = gameStat.stats.filter((item) => percentErrorCalc(item));

  // 	} else {
  // 		cardsArray = gameStat.stats.filter((item, index) => index < 8 );
  // 	}
  // }

  // 	correctAnswerGame(){
  // 		const img = event.target;
  // 		const card = img.closets('.card-game');
  // 		img.dataset.isAnswered = true;
  // 		StatsPanel.append(correct); // add stars
  // 	animateAnswer();
  // 	playSound();
  // 	gameArray.pop();
  // 	if(gameArray.length){
  // 		setTimeout(() => {
  // 			card.classList.add('card-game_end');

  // 		}, 1000);
  // 	}else {
  // 		gameOver();

  // 	}
  // 	}

  // }
}
