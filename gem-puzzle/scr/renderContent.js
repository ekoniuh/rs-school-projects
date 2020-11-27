function createContent() {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `		<section class="page">
    <div class="menu">
    <div class="menu-wrapper">
      <ul class="menu-list">
      <li class="menu-item play-game">Continue</li>
				<li class="menu-item new-game">New Game</li>
        <li class="menu-item save-game">Saved games</li>
        <li class="menu-item load-game">load Game</li>
        <li class="menu-item settings">Settings</li>
        <li class="menu-item field-size__box field-size__box_display">
	          <label class="nav__btn">Field size: </label>
	          <select class="select-box">
		          <option class="select-option" value="3">3x3</option>
		          <option class="select-option" value="4" selected="">4x4</option>
		          <option class="select-option" value="5">5x5</option>
		          <option class="select-option" value="6">6x6</option>
		          <option class="select-option" value="7">7x7</option>
		          <option class="select-option" value="8">8x8</option>
	          </select>
        </li>
				<li class="menu-item best-scores">Best scores</li>
      </ul>
      
		</div>
		</div>
		<div class="content-box">
			<div class="control-wrap">
				<div class="info">
					<span class="description">Time </span>
					<span class="timer">00:00</span>
				</div>
				<div class="moves">
					<span class="description">Moves</span>
					<span class="counter">0</span>
				</div>
        <img class="pause visible" src="./assets/pause-play.png" title = "pause">
        <img class="restart-game" src="./assets/47-512.png" title = "Restart">
        <div class="volume"></div>		
			</div>
			<div class="field field-font__size_l">
			</div>
			<audio src="./assets/audio.mp3" class="audio-play" type="audio/mp3"></audio>
		</div>
	</section>`
  );
}
createContent();

const sizeField = document.querySelector('.select-box');
const restartGame = document.querySelector('.restart-game');
const field = document.querySelector('.field');
const time = document.querySelector('.timer');
const counterStep = document.querySelector('.counter');
const continueGame = document.querySelector('.pause');
const menu = document.querySelector('.menu');
const playPauseGame = document.querySelector('.play-game');
const newGame = document.querySelector('.new-game');
const settings = document.querySelector('.settings');
const saveGame = document.querySelector('.save-game');
const loadGame = document.querySelector('.load-game');
const bestScores = document.querySelector('.best-scores');
const fieldSizeDisplay = document.querySelector('.field-size__box');
const menuWrapper = document.querySelector('.menu-wrapper');
const menuList = document.querySelector('.menu-list');
const volumeBtn = document.querySelector('.volume');

export {
  sizeField,
  restartGame,
  field,
  time,
  counterStep,
  continueGame,
  menu,
  playPauseGame,
  newGame,
  settings,
  saveGame,
  loadGame,
  bestScores,
  fieldSizeDisplay,
  menuWrapper,
  menuList,
  volumeBtn,
};
