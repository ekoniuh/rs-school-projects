import './style-pets.css';
import petsData from '../../data/pets.json';

import '../../scripts/popup';
import { SliderPets } from '../../scripts';

const sliderPets = new SliderPets({
  data: petsData,
  sliderSelector: '.slider-box',
});

sliderPets.initSlider();
// // alert(
// //   'Здравствуйте. Не могли бы проверить задание ближе к выходным? Буду очень благодарен. ЖЫВЕ БЕЛАРУСЬ!',
// // );
