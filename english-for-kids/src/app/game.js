import { playAudio } from './audio';
import { state } from './state';
import { shuffle } from './utils';
export default class Game {
  startGame() {
		playAudio(state.wordGameArray[state.wordGameArray.length - 1]);
    // if (state.playActive && state.wordGameArray.length) {
    //   playAudio(state.wordGameArray[state.wordGameArray.length - 1]);
    // } else {
      
      // state.playActive = !state.playActive;
      // state.wordGameArray[state.wordGameArray.length - 1];
    // }
  }

  checkedWord(card, wordPlay) {
    const { word } = card.dataset;
    if (state.wordGameArray.length > 0) {
      if (word === wordPlay) {
        this.correctAnswer(card);
      } else {
        // gameStat.errorClick(arr.text);
        this.errorAnswer();
      }
    }
  }

  correctAnswer(card) {
    playAudio('correct');
    card.dataset.checked = true;
    card.classList.toggle('category-card_train');

    const div = document.createElement('div');
    div.className = 'correct-answer';
    document.querySelector('.repeat-button').after(div);

    state.wordGameArray.pop();
  }

  errorAnswer() {
    playAudio('error');
    const div = document.createElement('div');
    div.className = 'error-answer';
    document.querySelector('.repeat-button').before(div);
  }

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

  // errorAnswer(event){

  // 	errorsCount+=1;
  // 	const card = target.closets('.card-game');
  // 	const error = createIndicator('error');
  // 	animateAnswer(card,'error');
  // 	statsPanel.append(error);
  // 	playAydio('....error.mp3')
  // }

  // 	animateAnswer(card, indicator){
  // 		card.classList.add('adssad{ind}');
  // 		setTimeout(()
  // 		card.classList.remove('{ind}'))
  // 	}

  // 	gameOver(){
  // 		isGameStart = true;
  // 		if(errorsCount){
  // 			playSound('./.....');
  // 			title.textContent= ...;

  // 			setTimeout(() => {
  // 				renderMainPage();

  // 			}, 1000);
  // 		}
  // 	}

  // gameOver(){
  // 	isGameStart = true;
  // 	if(errorsCount){
  // 		playSound('./.....');
  // 		title.textContent= ...;

  // 		setTimeout(() => {
  // 			renderMainPage();

  // 		}, 1000);
  // 	}
  // }

  // }

  // cardsClick(event){
  // 	const card = target.closest('.card-categ');
  // 	const {word, isAnswered} = target.dataset;

  // 	if(card && )
}
