import { saveObj } from './getLocalStorage';

function renderMenuDownloadGame() {
  document.querySelector('.menu-list').classList.toggle('menu-list_hidden');
  if (document.querySelector('.save-list')) {
    document.querySelector('.save-list').innerHTML = '';
    document.querySelector('.save-list__box').remove();
  }

  const div = document.createElement('div');
  div.className = 'save-list__box';
  document.querySelector('.menu-wrapper').append(div);

  const ul = document.createElement('ul');
  ul.className = `save-list`;
  document.querySelector('.save-list__box').append(ul);

  const buttonMenuBack = document.createElement('button');
  buttonMenuBack.className = 'menu-back__button';
  document.querySelector('.save-list__box').append(buttonMenuBack);

  const buttonDownload = document.createElement('button');
  buttonDownload.className = 'download-button';
  document.querySelector('.save-list__box').append(buttonDownload);

  for (let i = 0; i < saveObj.timer.length; i += 1) {
    document.querySelector('.save-list').insertAdjacentHTML(
      'beforeEnd',
      `<li class="save-list__item" data-index = ${i}>
				<div class="save-item__name">
          <img src="./assets/55899ca177a419ff0334fd84_Arrow10.png" alt="back-save-item" title="back-save-item" class="back-save__item" data-index = ${i}>
          <span	class="save-title">Save Game - <span>${i + 1}</span></span>
					<img src="./assets/55899ca177a419ff0334fd84_Arrow10.png" alt="next-save-item" title="next-save-item" class="next-save__item"  data-index = ${i}>
				</div>
				<div class="save-item__description">
					<span class="board-size__load">Board size: ${saveObj['Board size'][i]}x${saveObj['Board size'][i]}</span>
					<span class="time-game__load">time ${saveObj.timer[i]}</span>
					<span class="move-game__load">move  ${saveObj['move counter'][i]}</span>
				</div>
			</li>`
    );

    if (!i) {
      document.querySelector('.save-list__item').classList.add('save-list__item_active');
    }
  }

  setTimeout(() => {
    document.querySelector('.save-list__box').classList.toggle('save-list__box_visible');
  }, 1000);
}

function nextBackSaveItem(target, arrSaveItems) {
  const index = Number(target.dataset.index);
  if (target.className === 'next-save__item' && index !== arrSaveItems.length - 1) {
    arrSaveItems[index].classList.remove('save-list__item_active');
    arrSaveItems[index + 1].classList.add('save-list__item_active');
  }

  if (target.className === 'back-save__item' && index !== 0) {
    arrSaveItems[index].classList.remove('save-list__item_active');
    arrSaveItems[index - 1].classList.add('save-list__item_active');
  }
}

export { renderMenuDownloadGame, nextBackSaveItem };
