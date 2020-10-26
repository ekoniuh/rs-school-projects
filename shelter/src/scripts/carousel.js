const nextButton = document.querySelector('.slider__btn-next');
const prevButton = document.querySelector('.slider__btn-prev');
// const sliderItem = ;

export class Slider {
  constructor({ sliderSelector, data }) {
    this.petsData = data;
    this.cardsOnPageCount = 3;
    this.idArray = this.buildIdArray(data);
    this.slider = document.querySelector(sliderSelector);
    this.translate = 0;
    this.page = 0;
    this.calculateCardsCount = this.calculateCardsCount.bind(this);
  }

  buildIdArray = (data) => {
    const shuffledData = data.sort(() => Math.random() - 0.5).slice(0, this.cardsOnPageCount);

    return shuffledData.map((pet) => pet.id);
  };

  getCardLayout = (id) => {
    const { img, name, type } = this.petsData.find((pet) => pet.id === id);

    return `
    <div class="slider-item" data-id="${id}">
      <img
        src="${img}"
        alt="${type} ${name}"
        class="slider-item__img"
      />
      <h4 class="slider-item__title">
        ${name}
      </h4>
      <button class="slider-item_btn" type="button">
        Learn more
      </button>
    </div>
  `;
  };

  swipeContainer = () => {
    const shuffledData = this.petsData.sort(() => Math.random() - 0.5);
    const dataWithoutCurrentIds = shuffledData.filter(({ id }) => !this.idArray.includes(id));
    const newRandomIds = dataWithoutCurrentIds.slice(0, this.cardsOnPageCount).map(({ id }) => id);
    this.idArray = newRandomIds;
    // while (bool) {
    //   arrNewId = this.buildIdArray(this.petsData);
    //   bool = arrNewId.some((el) => idArray.indexOf(el) !== -1);
    // }

    while (this.slider.firstElementChild) {
      this.slider.firstElementChild.remove();
    }

    this.slider.insertAdjacentHTML(
      'afterbegin',
      newRandomIds.map((id) => this.getCardLayout(id)).join(''),
    );
  };

  calculateCardsCount = () => {
    const prevCountCards = this.cardsOnPageCount;
    const windowWidth = document.body.offsetWidth;
    if (windowWidth < 768) {
      this.cardsOnPageCount = 1;
    } else if (windowWidth < 1280) {
      this.cardsOnPageCount = 2;
    } else {
      this.cardsOnPageCount = 3;
    }

    if (prevCountCards === this.cardsOnPageCount) {
      return;
    }

    while (this.slider.firstElementChild) {
      this.slider.firstElementChild.remove();
    }

    const slicedCards = this.idArray.slice(0, this.cardsOnPageCount);
    this.slider.insertAdjacentHTML(
      'afterbegin',
      slicedCards.map((id) => this.getCardLayout(id)).join(''),
    );
  };

  initSlider = () => {
    const petsCards = this.idArray.map((id) => this.getCardLayout(id));

    window.addEventListener('resize', this.calculateCardsCount);
    nextButton.addEventListener('click', this.swipeContainer);
    prevButton.addEventListener('click', this.swipeContainer);

    this.slider.insertAdjacentHTML('afterbegin', petsCards.join(''));
  };
}
// swipeContainer = ({ direction }) => {
//   const width = this.slider.clientWidth + 90;
//   const diff = direction === 'forward' ? -width : width;

//   this.page = direction === 'forward' ? this.page + 1 : this.page - 1;
//   this.translate += diff;
//   this.slider.style.transform = `translateX(${this.translate}px)`;
// };

// if (direction === 'forward') {
//   if (this.n > petsCards.length - 2) {
//     this.k = 0;
//     this.n = 3;
//   } else {
//     this.n += 3;
//     this.k += 3;
//   }
// } else if (direction === 'backward') {
//   if (this.k < 3 || this.n < 3) {
//     this.k = petsCards.length - 4;
//     this.n = petsCards.length - 1;
//   } else {
//     this.k -= 3;
//     this.n -= 3;
//   }
// }

// buildIdArray = (data) => {
//   const res = [];

//   for (let i = 0; i < PAGES_COUNT; i += 1) {
//     const shuffledData = data.sort(() => Math.random() - 0.5);

//     res.push(...shuffledData.map((pet) => pet.id));
//   }

//   return res;
// };
