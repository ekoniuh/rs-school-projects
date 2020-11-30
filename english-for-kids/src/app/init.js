// const removeContainer = () => {
//   document.querySelector('.cards').remove();
// };
// document
//   .querySelector('.category-card')
//   .addEventListener('click', () => removeContainer());

// document.querySelector('.hamburger').addEventListener('click', () => {
//   document.querySelector('.navigation').classList.toggle('navigation_hidden');
//   document
//     .querySelector('.hamburger')
//     .classList.toggle('hamburger__line_active');
// });
// const cards = require('../data/cards.json');
// console.log(cards);
import '../styles/style.scss';
import dataCard from '../data/cards.json';
import { doc } from 'prettier';
import { Stats } from 'webpack';

isMenuOpen
toggleClasses
openMenu
closeMenu
menuClickHandler{
	if(!isMenuOpen){
		closeMenu();
	}
	openMenu()
}

playSound(source){
	audio.setAttribute('src', source);
	audio.play();
}

searchPlaySound(text){
	const card = find.(item => item.text === text);
	if(card) {
		playSound(card.sound);
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


resetGame(){
	isGameStart = false;
	statsPanel.innerHTML ='';
	const endCards = [...document.querySelectorAll('.card....')];
 endCards.forEach
	for (const card of endCards){
		card.classList.remove('card_end');
		removeattr();
	}
}

function setStartGameState{
	button.remove(constant.buttonClassRepeat);
resetGame();
isStateStart = !isStateStart;

if(state !== )
}


static shuffle(arr){
	for (let i = array.length - 1 ; i > 0; i -+ 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i],arr[j]] = [arr[j],arr[i]]
		
			}
}

function startGame() {
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

buttonStart.addEventListener('click', startGame);

function repeatWords(){
	const categotyChecked = document.querySelector('in').nodeValue;
	if(categotyChecked === 'all'){
		cardsArray = gameStat.stats.filter((item) => percentErrorCalc(item));
		
	} else { 
		cardsArray = gameStat.stats.filter((item, index) => index < 8 );
	}
}

removeMenu
toggleMode
changeCategory
showResults
returnToMenu
shuffle
addMark
handleAnswer
finishGame
startGame
flipCard // переворот карты
handleClick
setMode
returnCard // перевернуть карту {
	const flippedCard = document.querySelector('.card_fipped') || false;
	if(flipped && !e.target.closest('.card_flipped')){
		flippedCard.classList.toggle('card_flipped')
	}
}

document.querySelector(`'[data-category = ${this.categoryIndex}'`).classList.remove()
// class Cards(){
// 	constructor {


card creator:

createCardWorld
createCardImg
createCardAudio
createCardButton
create
// 	}

// 	render(){

// 	}
// }

let audio;
function playAydio(url) {
  // if (!audio)
  audio = new Audio();
  audio.src = url;
  audio.load();
  audio.play();
}

document.querySelector('.category-card').addEventListener('click', () => {
  playAydio('../assets/audio/angry.mp3');
});

const renderCategoryCards = () => {
  // const nameCategory = target.textContent;
  const div = document.createElement('div');
  div.className = 'category-card category-card_train';
  document.querySelector('.cards').append(div);
};

renderCategoryCards();


document.addEventListener('DOMContentLoaded', init());
