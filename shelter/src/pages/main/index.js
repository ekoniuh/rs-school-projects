import './style.scss';
// import '../pets/style-pets.css';
import '../../scripts/popup';
import petsData from '../../data/pets.json';
import { SliderMain } from '../../scripts';

const sliderMain = new SliderMain({
  data: petsData,
  sliderSelector: '.slider-box',
});

sliderMain.initSlider();
// alert(
//   'Здравствуйте. Не могли бы проверить задание ближе к выходным? Буду очень благодарен. ЖЫВЕ БЕЛАРУСЬ!',
// );
