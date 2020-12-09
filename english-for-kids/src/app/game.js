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
import gameState from './gameState';
import { doc } from 'prettier';

export default class Game {
  startGame() {
    const word = state.wordGameArray[state.wordGameArray.length - 1];
    setTimeout(() => {
      playAudio(word);
    }, 1000);
  }

  checkedWord(card, wordPlay) {
    const { word } = card.dataset;
    document.querySelector('.answer-wrap').classList.remove('answer-wrap_none');
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
    img.src = 'https://www.flaticon.com/svg/static/icons/svg/725/725107.svg';
    img.alt = 'correct-answer';
    document.querySelector('.answer-wrap').append(img);
    // repeatButton.after(img);

    state.wordGameArray.pop();
    this.startGame();
    if (!state.wordGameArray.length) {
      if (!state.errors) {
        this.finishGame('success');
      } else {
        this.finishGame('failure');

        const h2 = document.createElement('h2');
        h2.className = 'sum-errors';
        h2.innerHTML = 'ERORROS:' + state.errors;
        state.errors = 0;
        document.querySelector('.failure').after(h2);
      }
    }
  }

  errorAnswer() {
    state.errors += 1;
    playAudio('error');
    const img = document.createElement('img');
    img.className = 'error-answer';
    img.src = 'https://www.flaticon.com/svg/static/icons/svg/569/569513.svg';
    img.alt = 'error-answer';
    document.querySelector('.answer-wrap').append(img);
  }

  finishGame(win) {
    playAudio(win);

    document.querySelector('.cards').innerHTML = '';
    const div = document.createElement('div');
    div.className = `${win}`;

    document.querySelector('.category').before(div);

    answersContainer.classList.add('answers_none');
    repeatButton.classList.add('repeat__btn_none');

    setTimeout(() => {
      document.querySelector(`.${win}`).remove();
      if (document.querySelector('.sum-errors')) {
        document.querySelector('.sum-errors').remove();
      }
      document.querySelector('.category').classList.toggle('category_none');
    }, 2000);

    document.querySelector('.answer-wrap').innerHTML = '';
    document.querySelector('.answer-wrap').classList.add('answer-wrap_none');
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
