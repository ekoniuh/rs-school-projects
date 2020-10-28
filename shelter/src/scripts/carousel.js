// import { doc } from 'prettier';

const prevButtonSliderPets = document.querySelector('.slider-pets__btn_prev');
const nextButtonSliderPets = document.querySelector('.slider-pets__btn_next');
const firstPage = document.querySelector('.first-page');
const lastPage = document.querySelector('.last-page');
const countPage = document.querySelector('.btn_pagination');
const menuBtn = document.querySelector('.menu__btn');
const nextButtonSliderMain = document.querySelector('.slider__btn-next');
const prevButtonSliderMain = document.querySelector('.slider__btn-prev');

export class SliderMain {
  constructor({ sliderSelector, data }) {
    this.petsData = data;
    this.windowWidth = 0;
    this.cardsOnPageCount = 3;
    this.idArray = [];
    this.slider = document.querySelector(sliderSelector);
    this.translate = 0;
    this.page = 0;
    this.btn = true;
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

  getWidthWindow = () => {
    this.windowWidth = document.body.offsetWidth;
    this.cardsOnPageCount = this.windowWidth < 768 ? 1 : this.windowWidth < 1280 ? 2 : 3;
  };

  overflowHidden = () => {
    if (this.btn) {
      document.body.style.overflow = 'hidden';
      this.btn = false;
      document.querySelector('.hamburger-menu__logo ').style.visibility = 'visible';
      document.querySelector('.hamburger-menu__logo ').style.right = '122px';
      document.querySelector('.logo').style.display = 'none';
    } else {
      document.body.style.overflow = 'visible';
      this.btn = true;
      document.querySelector('.hamburger-menu__logo ').style.visibility = 'hidden';
      document.querySelector('.hamburger-menu__logo ').style.right = '-100%';
      document.querySelector('.logo').style.display = 'block';
    }
  };

  // closeMenu = ({ target }) => {
  //   if ((target.className = 'main')) {
  //     console.log('target.matches(.main)', target.matches('.main'));
  //     document.querySelector('.hamburger-menu__logo ').style.visibility = 'hidden';
  //     document.querySelector('.menu__box').style.visibility = 'hidden';
  //     document.querySelector('.hamburger-menu__logo ').style.right = '-100%';
  //     document.querySelector('.logo').style.display = 'none';
  //     // document.querySelector('#menu__toggle .menu__btn > span').style.transform = 'rotate(90deg)';
  //     this.btn = true;
  //   }
  // else {
  // document.querySelector('.hamburger-menu__logo ').style.visibility = 'visible';
  // document.querySelector('.menu__box').style.visibility = 'visible';
  // document.querySelector('.hamburger-menu__logo ').style.right = '122px';
  // document.querySelector('.logo ').style.display = 'block';
  // this.btn = true;
  // }
  // };

  initSlider = () => {
    this.getWidthWindow();

    this.idArray = this.buildIdArray(this.petsData);
    const petsCards = this.idArray.map((id) => this.getCardLayout(id));

    window.addEventListener('resize', this.calculateCardsCount);
    nextButtonSliderMain.addEventListener('click', this.swipeContainer);
    prevButtonSliderMain.addEventListener('click', this.swipeContainer);

    this.slider.insertAdjacentHTML('afterbegin', petsCards.join(''));
    // document.querySelector('.main').addEventListener('click', this.closeMenu);
    // document
    //   .querySelector('.main')
    //   .addEventListener('click', ({ target }) => this.closeMenu({ target }));
    menuBtn.addEventListener('click', ({ target }) => this.overflowHidden({ target }));
  };
}

export class SliderPets {
  constructor({ sliderSelector, data }) {
    this.petsData = data;
    this.cardsOnPageCount = 0;
    this.sliderArray = this.buildIdArray(data);
    this.slider = document.querySelector(sliderSelector);
    this.firstPositionSlice = 0;
    this.lastPositionSlice = 0;
    this.windowWidth = 0;
    this.translate = 0;
    this.pagesCount = 6;
    this.page = 1;
    this.btn = true;
    this.lastPage = 0;
    this.calculateCardsCount = this.calculateCardsCount.bind(this);
  }

  buildIdArray = (data) => {
    const res = [];
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
    if (direction === 'sliderArrowRight') {
      if (this.lastPositionSlice < 48) {
        this.firstPositionSlice += this.cardsOnPageCount;
        this.lastPositionSlice += this.cardsOnPageCount;
        this.page += 1;
      }
    }

    if (direction === 'sliderArrowleft') {
      if (this.firstPositionSlice !== 0) {
        prevButtonSliderPets.disabled = false;
        firstPage.disabled = false;
        this.firstPositionSlice -= this.cardsOnPageCount;
        this.lastPositionSlice -= this.cardsOnPageCount;
        this.page -= 1;
      }
    }

    if (direction === 'firstPage') {
      this.firstPositionSlice = 0;
      this.lastPositionSlice = this.cardsOnPageCount;
      this.page = 1;
    }

    if (direction === 'lastPage') {
      this.firstPositionSlice = 48 - this.cardsOnPageCount;
      this.lastPositionSlice = 48;
      this.page = this.lastPage;
    }

    while (this.slider.firstElementChild) {
      this.slider.firstElementChild.remove();
    }
    countPage.textContent = this.page;
    this.slider.insertAdjacentHTML(
      'afterbegin',
      this.sliderArray
        .slice(this.firstPositionSlice, this.lastPositionSlice)
        .map((id) => this.getCardLayout(id))
        .join(''),
    );

    if (this.firstPositionSlice === 0) {
      prevButtonSliderPets.disabled = true;
      firstPage.disabled = true;
    } else {
      prevButtonSliderPets.disabled = false;
      firstPage.disabled = false;
    }

    if (this.lastPositionSlice === 48) {
      nextButtonSliderPets.disabled = true;
      lastPage.disabled = true;
    } else {
      nextButtonSliderPets.disabled = false;
      lastPage.disabled = false;
    }
  };

  calculateCardsCount = () => {
    const prevCountCards = this.cardsOnPageCount;
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

    prevButtonSliderPets.disabled = true;
    firstPage.disabled = true;
    nextButtonSliderPets.disabled = false;
    lastPage.disabled = false;
    this.firstPositionSlice = 0;
    this.lastPositionSlice = this.cardsOnPageCount;
    this.lastPage = 48 / this.cardsOnPageCount;
    this.page = 1;
    countPage.textContent = 1;

    while (this.slider.firstElementChild) {
      this.slider.firstElementChild.remove();
    }

    const slicedCards = this.sliderArray.slice(0, this.cardsOnPageCount);

    this.slider.insertAdjacentHTML(
      'afterbegin',
      slicedCards.map((id) => this.getCardLayout(id)).join(''),
    );
  };

  getWidthWindow = () => {
    this.windowWidth = document.body.offsetWidth;
    this.cardsOnPageCount = this.windowWidth < 768 ? 3 : this.windowWidth < 1280 ? 6 : 8;
    this.lastPositionSlice = this.cardsOnPageCount;
    this.lastPage = 48 / this.cardsOnPageCount;
  };

  overflowHidden = () => {
    if (this.btn) {
      document.body.style.overflow = 'hidden';
      document.querySelector('.hamburger-menu__logo ').style.visibility = 'visible';
      document.querySelector('.hamburger-menu__logo ').style.right = '122px';
      document.querySelector('.logo ').style.display = 'none';

      this.btn = false;
    } else {
      document.body.style.overflow = 'visible';
      document.querySelector('.hamburger-menu__logo ').style.visibility = 'hidden';
      document.querySelector('.hamburger-menu__logo ').style.right = '-100%';
      document.querySelector('.logo ').style.display = 'block';

      this.btn = true;
    }
  };

  initSlider = () => {
    this.getWidthWindow();

    window.addEventListener('resize', this.calculateCardsCount);
    const petsCards = this.sliderArray
      .slice(0, this.cardsOnPageCount)
      .map((id) => this.getCardLayout(id));

    nextButtonSliderPets.addEventListener('click', () =>
      this.swipeContainer({ direction: 'sliderArrowRight' }),
    );

    prevButtonSliderPets.addEventListener('click', () =>
      this.swipeContainer({ direction: 'sliderArrowleft' }),
    );

    firstPage.addEventListener('click', () => this.swipeContainer({ direction: 'firstPage' }));

    lastPage.addEventListener('click', () => this.swipeContainer({ direction: 'lastPage' }));

    this.slider.insertAdjacentHTML('afterbegin', petsCards.join(''));

    menuBtn.addEventListener('click', this.overflowHidden);
  };
}
