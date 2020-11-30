const audio = new Audio( 'audio.mp3'); 

let audio;
function playAydio(url) {
  if(!audio) audio = new Audio(); // <== тоже самое что 
                                  // document.createElement('audio)';
  audio.src = url;
  audio.load();
  audio.play();
}

function play(event){
	const cardWord = target.parentElement.dataset.word;
	const cardName = target.innerHTML;
	const cardsContainer = document.querySelector('.cards__container');
	const rotate = target.closest('.rotate') ;
	const = ;
	const = ;
}