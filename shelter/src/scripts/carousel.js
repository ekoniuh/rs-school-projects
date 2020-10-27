// const prevButtonSliderPets = document.querySelector('.slider-pets__btn_prev');
const nextButtonSliderPets = document.querySelector('.slider-pets__btn_next');
// const nextButtonSliderPets = document.querySelector('.slider-item-next');
const nextButtonSliderMain = document.querySelector('.slider__btn-next');
const prevButtonSliderMain = document.querySelector('.slider__btn-prev');
// const sliderItem = ;

export class SliderMain {
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

    this.idArray = dataWithoutCurrentIds.slice(0, 3).map(({ id }) => id);

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
    console.log(this.cardsOnPageCount);
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
    console.log(this.cardsOnPageCount);
    console.log(' this.idArray', this.idArray);

    const slicedCards = this.idArray.slice(0, this.cardsOnPageCount);
    console.log(' this.slicedCards', slicedCards);
    this.slider.insertAdjacentHTML(
      'afterbegin',
      slicedCards.map((id) => this.getCardLayout(id)).join(''),
    );
  };

  initSlider = () => {
    const petsCards = this.idArray.map((id) => this.getCardLayout(id));

    window.addEventListener('resize', this.calculateCardsCount);
    nextButtonSliderMain.addEventListener('click', this.swipeContainer);
    prevButtonSliderMain.addEventListener('click', this.swipeContainer);

    this.slider.insertAdjacentHTML('afterbegin', petsCards.join(''));
  };
}
let firstPositionSlice = 0;
let lastPositionSlice = 8;
export class SliderPets {
  constructor({ sliderSelector, data }) {
    this.petsData = data;
    this.cardsOnPageCount = 8;
    this.sliderArray = this.buildIdArray(data);
    this.slider = document.querySelector(sliderSelector);
    this.translate = 0;
    this.pagesCount = 6;
    this.page = 0;
    this.calculateCardsCount = this.calculateCardsCount.bind(this);
  }

  buildIdArray = (data) => {
    // const shuffledData = data.sort(() => Math.random() - 0.5).slice(0, this.cardsOnPageCount);
    const res = [];
    // const shuffledData = [];
    for (let i = 0; i < 6; i += 1) {
      const shuffledData = data.sort(() => Math.random() - 0.5).map((pet) => pet.id);
      res.push(...shuffledData);
    }
    return res;
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

  swipeContainer = ({ direction }) => {
    // const shuffledData = this.petsData.sort(() => Math.random() - 0.5);
    // const newRandomIds = shuffledData.map(({ id }) => id);
    // this.idArray = newRandomIds;

    // const dataWithoutCurrentIds = shuffledData.filter(({ id }) => !this.idArray.includes(id));
    // const newRandomIds = dataWithoutCurrentIds.slice(0, this.cardsOnPageCount).map(({ id }) => id);

    // this.idArray = dataWithoutCurrentIds.slice(0, 3).map(({ id }) => id);

    if (direction === 'forward') {
      if (lastPositionSlice < 48) {
        firstPositionSlice += this.cardsOnPageCount;
        lastPositionSlice += this.cardsOnPageCount;
      } else {
        firstPositionSlice = 0;
        lastPositionSlice = this.cardsOnPageCount;
      }

      console.log('lastPositionSlice', lastPositionSlice);
      console.log('firstPositionSlice', firstPositionSlice);
    }
    while (this.slider.firstElementChild) {
      this.slider.firstElementChild.remove();
    }

    this.slider.insertAdjacentHTML(
      'afterbegin',
      this.sliderArray
        .slice(firstPositionSlice, lastPositionSlice)
        .map((id) => this.getCardLayout(id))
        .join(''),
    );
  };

  calculateCardsCount = () => {
    const prevCountCards = this.cardsOnPageCount;
    console.log(this.cardsOnPageCount);
    const windowWidth = document.body.offsetWidth;
    if (windowWidth < 768) {
      this.cardsOnPageCount = 3;
    } else if (windowWidth < 1280) {
      this.cardsOnPageCount = 6;
    } else {
      this.cardsOnPageCount = 8;
    }

    if (prevCountCards === this.cardsOnPageCount) {
      return;
    }
    while (this.slider.firstElementChild) {
      this.slider.firstElementChild.remove();
    }
    console.log(this.cardsOnPageCount);
    console.log(' this.idArray', this.sliderArray);

    const slicedCards = this.sliderArray.slice(0, this.cardsOnPageCount);
    console.log(' this.slicedCards', slicedCards);
    this.slider.insertAdjacentHTML(
      'afterbegin',
      slicedCards.map((id) => this.getCardLayout(id)).join(''),
    );
  };

  initSlider = () => {
    const petsCards = this.sliderArray
      .slice(0, this.cardsOnPageCount)
      .map((id) => this.getCardLayout(id));
    // console.log(' this.petsCards', petsCards);
    window.addEventListener('resize', this.calculateCardsCount);

    // nextButtonSliderPets.addEventListener('click', this.swipeContainer({ direction: 'forward' }));
    nextButtonSliderPets.addEventListener('click', () =>
      this.swipeContainer({ direction: 'forward' }),
    );

    this.slider.insertAdjacentHTML('afterbegin', petsCards.join(''));
  };
}
