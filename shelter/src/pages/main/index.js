import './style.scss';
import '../../scripts/popup';
import petsData from '../../data/pets.json';
import { Slider } from '../../scripts';

const slider = new Slider({
  data: petsData,
  sliderSelector: '.slider-box',
});

slider.initSlider();
