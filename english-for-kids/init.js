const removeContainer = () => {
  document.querySelector('.cards').remove();
};
document
  .querySelector('.category-card')
  .addEventListener('click', () => removeContainer());
