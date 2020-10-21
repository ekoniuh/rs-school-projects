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
    this.n = 3;
    this.k = 0;
    this.a = [];
  }

  buildIdArray = (data) => {
    const res = [];

    for (let i = 0; i < PAGES_COUNT; i += 1) {
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

  swipeContainer = ({ direction, petsCards }) => {
    while (this.slider.firstChild) {
      this.slider.firstChild.remove();
    }

    if (direction === 'forward') {
      if (this.n > petsCards.length - 2) {
        this.k = 0;
        this.n = 3;
      } else {
        this.n += 3;
        this.k += 3;
      }
    } else if (direction === 'backward') {
      if (this.k < 3 || this.n < 3) {
        this.k = petsCards.length - 4;
        this.n = petsCards.length - 1;
      } else {
        this.k -= 3;
        this.n -= 3;
      }
    }
    console.log(this.n, this.k);
    this.slider.insertAdjacentHTML('afterbegin', petsCards.slice(this.k, this.n).join(''));
  };

  // swipeContainer = ({ direction }) => {
  //   const width = this.slider.clientWidth + 90;
  //   const diff = direction === 'forward' ? -width : width;

  //   this.page = direction === 'forward' ? this.page + 1 : this.page - 1;
  //   this.translate += diff;
  //   this.slider.style.transform = `translateX(${this.translate}px)`;
  // };

  initSlider = () => {
    const petsCards = this.idArray.map((id) => this.getCardLayout(id));

    nextButton.addEventListener('click', () =>
      this.swipeContainer({ direction: 'forward', petsCards: petsCards }),
    );
    prevButton.addEventListener('click', () =>
      this.swipeContainer({ direction: 'backward', petsCards: petsCards }),
    );

    this.slider.insertAdjacentHTML('afterbegin', petsCards.slice(this.k, this.n).join(''));
  };
}
