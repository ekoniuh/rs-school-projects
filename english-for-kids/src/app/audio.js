// audio.load();
// audio.play();

export const playAudio = (word) => {
  const audio = new Audio(`./assets/audio/${word}.mp3`);
  // if(!audio) audio = new Audio();
  // audio.src = url;
  audio.load();
  audio.play();
};

// function play(event){
// 	const cardWord = target.parentElement.dataset.word;
// 	const cardName = target.innerHTML;
// 	const cardsContainer = document.querySelector('.cards__container');
// 	const rotate = target.closest('.rotate') ;
// 	const = ;
// 	const = ;
// }

// searchPlaySound(text){
// 	const card = find.(item => item.text === text);
// 	if(card) {
// 		playSound(card.sound);
// 	}
// }
