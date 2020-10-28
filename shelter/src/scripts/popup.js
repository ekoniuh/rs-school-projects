import petsData from '../data/pets.json';

const sliderContainer = document.querySelector('.slider-box');

const buildPopupContent = (id) => {
  const pet = petsData.find((pet) => pet.id === id);

  return `
  <div class="slider-description" data-set="action">
  <img src="./assets/modal_close_button.png" class="modal_close_button">
    <div class="description-container">
      <img src="${pet.img}" alt="" class="slider-item__img">
        <div class="slider-item__info">
          <div class="pets-title">
            <h3 class="pets-name">${pet.name}</h3>
            <h4 class="pets-breed">${pet.type} - ${pet.breed}</h4>
          </div>
          <p>${pet.description}</p>
          <ul class="list-description">
            <li class="list-item"><span class="color-font">Age: ${pet.age}</span></li>
            <li class="list-item"><span class="color-font">Inoculations: ${pet.inoculations}</span></li>
            <li class="list-item"><span class="color-font">Diseases: ${pet.diseases}</span></li>
            <li class="list-item"><span class="color-font">Parasites: ${pet.parasites}</span></li>
          </ul>
        </div>
    </div>
  </div>`;
};

sliderContainer.addEventListener('click', ({ target }) => {
  const sliderItem = target.closest('.slider-item');
  document.body.style.overflow = 'hidden';
  if (!sliderItem) {
    return;
  }

  const id = sliderItem.dataset.id;
  const popup = buildPopupContent(id);

  document.body.insertAdjacentHTML('beforeend', popup);
  const sliderContainerRemove = document.querySelector('.slider-description');
  // debugger;

  sliderContainerRemove.addEventListener('click', ({ target }) => {
    if (!target.closest('.description-container')) {
      sliderContainerRemove.remove();
      document.body.style.overflow = 'visible';
    }
  });
});
