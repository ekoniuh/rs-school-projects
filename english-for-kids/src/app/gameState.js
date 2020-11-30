import cardsData from 'data/cards';

class GameState(){
	constructor(){
		this.stats = JSON.parse(localStorage.getItem('gameSta')) || cardsData;
	}

	saveStats(){
		localStorage.setItem('gameState', JSON.stringify(this.stats));
	}

	resetStats(){
		this.stats = cardsData.map((item) => ({
			...item,
			trainClicks: 0,
			correctClick: 0,
			errorClick: 0,
		}));

		this.saveStats();
	}

	trainClick(text){
		this.plusClisk(text, 'trainClick');
	}

	correctClick(text){
		this.plusClisk(text, 'correctClick');
	}

	errorClick(){
		this.plusClisk(text, 'errorClick');
	}

	plusClisk(text, field){
		const word = this.stats.fild(item => item.text === text);

		if(word){
			word[field] += 1;
			this.saveStats();
		}
		// дописать

	}
}
