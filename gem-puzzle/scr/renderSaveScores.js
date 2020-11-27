import { saveScores } from './getLocalStorage';
import { menu, menuWrapper, menuList } from './renderContent';
//+

function renderScoresList() {
  menuWrapper.insertAdjacentHTML(
    'beforeEnd',
    `<div class="best-scores__box">
        <button class="menu-back__button_scores"></button>
        <h2 class="best-scores__title">Best scores</h2>
        <h3 class="scores-title__description">
            <span class="scores-title__date">
              Date
            </span>
            <span class="scores-title__moves">
             Moves 
             </span>
             <span class="scores-title__size">
             Size
            </span>
            <span class="scores-title__time">
             Time
             </span>
          </h3>     
      <ul class="scores-list">
      </ul>
  </div>`
  );

  for (let i = 0; i < saveScores.time.length; i += 1) {
    document.querySelector('.scores-list').insertAdjacentHTML(
      'beforeEnd',
      `<li class="scores-list__item" data-index = ${i}>
        <span class="scores-title__date">
        <span class="score-item__numbering"> ${i + 1} </span>
         <span class="score-item__hour">${saveScores.date[i][0]}</span> </br> 
      <span class="score-item__date">${saveScores.date[i][1]}
        </span></span>
        <span class="scores-title__moves">
        ${saveScores.move[i]}
        </span>
        <span class="scores-title__size">
        ${saveScores.size[i]}
        </span>
        <span class="scores-title__time">
        ${saveScores.time[i]}
        </span>
      </li>`
    );
  }
}

function createSaveScores() {
  if (document.querySelector('.best-scores__box')) {
    document.querySelector('.best-scores__box').remove();
  }

  menuList.classList.toggle('menu-list_offset-left');

  setTimeout(() => {
    menuList.classList.toggle('menu-list_none');
     }, 1000);

  menu.classList.toggle('menu_offset-right-0');
  menuWrapper.classList.toggle('menu-scores__change');

  setTimeout(() => {
    renderScoresList();

    document
      .querySelector('.menu-back__button_scores')
      .addEventListener('click', () => {
        // menuList.style.display = 'flex';
        menuList.classList.toggle('menu-list_none');
        setTimeout(() => {
          menuList.classList.toggle('menu-list_offset-left');
          menu.classList.remove('menu_offset-right-0');
        }, 300);

        menuWrapper.classList.toggle('menu-scores__change');
        document
          .querySelector('.best-scores__box')
          .classList.toggle('best-scores__box_none');
      });
  }, 1000);
}

export default createSaveScores;
