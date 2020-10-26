import './style.scss';
// import '../pets/style-pets.css';
import '../../scripts/popup';
import petsData from '../../data/pets.json';
import { Slider } from '../../scripts';

const slider = new Slider({
  data: petsData,
  sliderSelector: '.slider-box',
});

slider.initSlider();
// alert(
//   'Здравствуйте. Не могли бы проверить задание ближе к выходным? Буду очень благодарен. ЖЫВЕ БЕЛАРУСЬ!',
// );
