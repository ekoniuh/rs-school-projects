
class Game{



	 startGame() {
		if (isGameStart && gameArray.length) {
			playSound(gameArray[gameArray - 1].sound);		
		} else {
			isGameStart = true;
			errorsCount = 0;
			buttonStart.classList.add('change button');
			buttonStart.setAttribute('title', 'Repeat'); // повторение саунд
			gameArray = shuffle(cardsArray);
			playSound(последние элемент в массиве плэй)
		}	
	}
	
  repeatWords(){
		const categotyChecked = document.querySelector('in').nodeValue;
		if(categotyChecked === 'all'){
			cardsArray = gameStat.stats.filter((item) => percentErrorCalc(item));
			
		} else { 
			cardsArray = gameStat.stats.filter((item, index) => index < 8 );
		}
	}

	checkWord(event){
		const {word} = target.dataset;
		if(gameArray.length > 0 ){
			if(word === arrray.text){
				correctAnswer(event);
			} else {
				gameStat.errorClick(arr.text);
				errorAnswer(event);
	
			}
		}
	}

	correctAnswerGame(){
		const img = event.target;
		const card = img.closets('.card-game');
		img.dataset.isAnswered = true;
		StatsPanel.append(correct); // add stars
	animateAnswer();
	playSound();
	gameArray.pop();
	if(gameArray.length){
		setTimeout(() => {
			card.classList.add('card-game_end');
	
		}, 1000);
	}else { 
		gameOver();
	
	}
	}

	
errorAnswer(event){

	errorsCount+=1;
	const card = target.closets('.card-game');
	const error = createIndicator('error');
	animateAnswer(card,'error');
	statsPanel.append(error);
	playAydio('....error.mp3')
}



	animateAnswer(card, indicator){
		card.classList.add('adssad{ind}');
		setTimeout(() 
		card.classList.remove('{ind}'))
	}


	gameOver(){
		isGameStart = true;
		if(errorsCount){
			playSound('./.....');
			title.textContent= ...;
	
			setTimeout(() => {
				renderMainPage();
	
			}, 1000);
		}
	}
}

animateAnswer(card, indicator){
	card.classList.add('adssad{ind}');
	setTimeout(() 
	card.classList.remove('{ind}'))
}




gameOver(){
	isGameStart = true;
	if(errorsCount){
		playSound('./.....');
		title.textContent= ...;

		setTimeout(() => {
			renderMainPage();

		}, 1000);
	}
}

//правильный ответ
correctAnswerGame(){
	const img = event.target;
	const card = img.closets('.card-game');
	img.dataset.isAnswered = true;
	StatsPanel.append(correct); // add stars
animateAnswer();
playSound();
gameArray.pop();
if(gameArray.length){
	setTimeout(() => {
		card.classList.add('card-game_end');

	}, 1000);
}else { 
	gameOver();

}
}


errorAnswer(event){

	errorsCount+=1;
	const card = target.closets('.card-game');
	const error = createIndicator('error');
	animateAnswer(card,'error');
	statsPanel.append(error);
	playAydio('....error.mp3')
}

checkWord(event){
	const {word} = target.dataset;
	if(gameArray.length > 0 ){
		if(word === arrray.text){
			correctAnswer(event);
		} else {
			gameStat.errorClick(arr.text);
			errorAnswer(event);

		}
	}
}

cardsClick(event){
	const card = target.closest('.card-categ');
	const {word, isAnswered} = target.dataset;

	if(card && )
}
