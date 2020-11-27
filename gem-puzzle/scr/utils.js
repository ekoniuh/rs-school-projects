import { settings, fieldSizeDisplay, field } from './renderContent';
import state from './state';

export function getSizeGame() {
  settings.classList.toggle('menu-item__anime');
  fieldSizeDisplay.classList.toggle('field-size__box_display');
}

export function getRandomArray() {
  return [...Array(state.sizeGame * state.sizeGame - 1).keys()].sort(
    () => Math.random() - 0.5
  );
}

export function changeSizeFonts(size) {
  if (size > state.BASIC_SIZE_FONT) {
    field.classList.add('field-font__size_s');
    field.classList.remove('field-font__size_l');
  } else {
    field.classList.remove('field-font__size_s');
    field.classList.add('field-font__size_l');
  }
}
