var slyders = document.querySelectorAll('.slyder__item');

var nextBtn = document.querySelector('.slyder__btn--end')
var previousBtn = document.querySelector('.slyder__btn--start')
console.log(slyders);

nextBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  var firstSlide = document.querySelector('.slyder__item--first');
  for (let i = 0; i < slyders.length; i++) {
    if (slyders[i] === firstSlide) {
      let m = i + 1;
      let n = i + 3;
      if (n > slyders.length - 1) {
        n = slyders.length - 1;
      }
      if (m > slyders.length - 3) {
        m = slyders.length - 3;
      }
      slyders[i].classList.add('slyder__item--hidden');
      slyders[i].classList.remove('slyder__item--current');
      slyders[i].classList.remove('slyder__item--first');
      slyders[m].classList.add('slyder__item--first');
      slyders[n].classList.add('slyder__item--current');
      slyders[n].classList.remove('slyder__item--hidden');
    }

  }
});

previousBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  var firstSlide = document.querySelector('.slyder__item--first');
  for (let i = 0; i < slyders.length; i++) {
    if (slyders[i] === firstSlide) {
      let m = i - 1;
      let n = i + 2;
      if (n >= slyders.length) {
        n = slyders.length - 1;
      }
      if (m < 0) {
        m = 0;
      }

      slyders[i].classList.remove('slyder__item--first');
      slyders[m].classList.add('slyder__item--current');
      slyders[m].classList.remove('slyder__item--hidden');
      slyders[m].classList.add('slyder__item--first');
      slyders[n].classList.remove('slyder__item--current');
      slyders[n].classList.add('slyder__item--hidden');
      console.log('n ' + n);
      console.log('i ' + i);
      console.log('m ' + m);
    }

  }
});