const nextButton = document.querySelector('.slider__btn-next');
const prevButton = document.querySelector('.slider__btn-prev');

const PAGES_COUNT = 6;

export class Slider {
  constructor({ sliderSelector, data }) {
    this.petsData = data;
    this.idArray = this.buildIdArray(data);
    this.slider = document.querySelector(sliderSelector);
    this.translate = 0;
    this.page = 0;
  }

  buildIdArray = (data) => {
    const res = [];

    for (let i = 0; i < PAGES_COUNT; i++) {
      const shuffledData = data.sort(() => Math.random() - 0.5);

      res.push(...shuffledData.map((pet) => pet.id));
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
    const width = this.slider.clientWidth + 40;
    const diff = direction === 'forward' ? -width : width;

    this.page = direction === 'forward' ? this.page + 1 : this.page - 1;
    this.translate += diff;
    this.slider.style.transform = `translateX(${this.translate}px)`;
  };

  initSlider = () => {
    const petsCards = this.idArray.map((id) => this.getCardLayout(id)).join('');
    nextButton.addEventListener('click', () => this.swipeContainer({ direction: 'forward' }));
    prevButton.addEventListener('click', () => this.swipeContainer({ direction: 'backward' }));

    this.slider.insertAdjacentHTML('afterbegin', petsCards);
  };
}
