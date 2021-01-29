import { playAudio } from './audio';
import { state, answersContainer, repeatButton } from './state';
import gameState from './gameState';

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

  createElementImg(element, className, src, alt) {
    const img = document.createElement(element);
    img.className = className;
    img.src = src;
    img.alt = alt;
    return img;
  }

  createElement(element, className) {
    const tag = document.createElement(element);
    tag.className = className;
    return tag;
  }

  correctAnswer(card) {
    playAudio('correct');
    card.dataset.checked = true;
    card.classList.toggle('category-card_train');

    const classNameImg = 'correct-answer';
    const srcImg = 'https://www.flaticon.com/svg/static/icons/svg/725/725107.svg';

    const img = this.createElementImg('img', classNameImg, srcImg, classNameImg);
    document.querySelector('.answer-wrap').append(img);

    state.wordGameArray.pop();
    this.startGame();
    if (!state.wordGameArray.length) {
      if (!state.errors) {
        this.finishGame('success');
      } else {
        this.finishGame('failure');

        const h2 = this.createElement('h2', 'sum-errors');

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
}
