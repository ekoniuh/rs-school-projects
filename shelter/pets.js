(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{FZBc:function(e,t,i){"use strict";function n(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}i.d(t,"a",(function(){return f})),i.d(t,"b",(function(){return y}));var s=document.querySelector(".slider-pets__btn_prev"),d=document.querySelector(".slider-pets__btn_next"),l=document.querySelector(".first-page"),c=document.querySelector(".last-page"),u=document.querySelector(".btn_pagination"),h=document.querySelector(".menu__btn"),m=document.querySelector(".slider__btn-next"),g=document.querySelector(".slider__btn-prev"),f=function e(t){var i=this,n=t.sliderSelector,a=t.data;r(this,e),o(this,"buildIdArray",(function(e){return e.sort((function(){return Math.random()-.5})).slice(0,i.cardsOnPageCount).map((function(e){return e.id}))})),o(this,"getCardLayout",(function(e){var t=i.petsData.find((function(t){return t.id===e})),n=t.img,a=t.name,r=t.type;return'\n    <div class="slider-item" data-id="'.concat(e,'">\n      <img\n        src="').concat(n,'"\n        alt="').concat(r," ").concat(a,'"\n        class="slider-item__img"\n      />\n      <h4 class="slider-item__title">\n        ').concat(a,'\n      </h4>\n      <button class="slider-item_btn" type="button">\n        Learn more\n      </button>\n    </div>\n  ')})),o(this,"swipeContainer",(function(){var e=i.petsData.sort((function(){return Math.random()-.5})).filter((function(e){var t=e.id;return!i.idArray.includes(t)})),t=e.slice(0,i.cardsOnPageCount).map((function(e){return e.id}));for(i.idArray=e.slice(0,3).map((function(e){return e.id}));i.slider.firstElementChild;)i.slider.firstElementChild.remove();i.slider.insertAdjacentHTML("afterbegin",t.map((function(e){return i.getCardLayout(e)})).join(""))})),o(this,"calculateCardsCount",(function(){var e=i.cardsOnPageCount,t=document.body.offsetWidth;if(i.cardsOnPageCount=t<768?1:t<1280?2:3,e!==i.cardsOnPageCount){for(;i.slider.firstElementChild;)i.slider.firstElementChild.remove();var n=i.idArray.slice(0,i.cardsOnPageCount);i.slider.insertAdjacentHTML("afterbegin",n.map((function(e){return i.getCardLayout(e)})).join(""))}})),o(this,"getWidthWindow",(function(){i.windowWidth=document.body.offsetWidth,i.cardsOnPageCount=i.windowWidth<768?1:i.windowWidth<1280?2:3})),o(this,"overflowHidden",(function(){i.btn?(document.body.style.overflow="hidden",i.btn=!1,document.querySelector(".hamburger-menu__logo ").style.visibility="visible",document.querySelector(".hamburger-menu__logo ").style.right="122px",document.querySelector(".logo").style.display="none"):(document.body.style.overflow="visible",i.btn=!0,document.querySelector(".hamburger-menu__logo ").style.visibility="hidden",document.querySelector(".hamburger-menu__logo ").style.right="-100%",document.querySelector(".logo").style.display="block")})),o(this,"initSlider",(function(){i.getWidthWindow(),i.idArray=i.buildIdArray(i.petsData);var e=i.idArray.map((function(e){return i.getCardLayout(e)}));window.addEventListener("resize",i.calculateCardsCount),m.addEventListener("click",i.swipeContainer),g.addEventListener("click",i.swipeContainer),i.slider.insertAdjacentHTML("afterbegin",e.join("")),h.addEventListener("click",(function(e){var t=e.target;return i.overflowHidden({target:t})}))})),this.petsData=a,this.windowWidth=0,this.cardsOnPageCount=3,this.idArray=[],this.slider=document.querySelector(n),this.translate=0,this.page=0,this.btn=!0,this.calculateCardsCount=this.calculateCardsCount.bind(this)},y=function e(t){var i=this,a=t.sliderSelector,m=t.data;r(this,e),o(this,"buildIdArray",(function(e){for(var t=[],i=0;i<6;i+=1){var a=e.sort((function(){return Math.random()-.5})).map((function(e){return e.id}));t.push.apply(t,n(a))}return t})),o(this,"getCardLayout",(function(e){var t=i.petsData.find((function(t){return t.id===e})),n=t.img,a=t.name,r=t.type;return'\n    <div class="slider-item" data-id="'.concat(e,'">\n      <img\n        src="').concat(n,'"\n        alt="').concat(r," ").concat(a,'"\n        class="slider-item__img"\n      />\n      <h4 class="slider-item__title">\n        ').concat(a,'\n      </h4>\n      <button class="slider-item_btn" type="button">\n        Learn more\n      </button>\n    </div>\n  ')})),o(this,"swipeContainer",(function(e){var t=e.direction;for("sliderArrowRight"===t&&i.lastPositionSlice<48&&(i.firstPositionSlice+=i.cardsOnPageCount,i.lastPositionSlice+=i.cardsOnPageCount,i.page+=1),"sliderArrowleft"===t&&0!==i.firstPositionSlice&&(s.disabled=!1,l.disabled=!1,i.firstPositionSlice-=i.cardsOnPageCount,i.lastPositionSlice-=i.cardsOnPageCount,i.page-=1),"firstPage"===t&&(i.firstPositionSlice=0,i.lastPositionSlice=i.cardsOnPageCount,i.page=1),"lastPage"===t&&(i.firstPositionSlice=48-i.cardsOnPageCount,i.lastPositionSlice=48,i.page=i.lastPage);i.slider.firstElementChild;)i.slider.firstElementChild.remove();u.textContent=i.page,i.slider.insertAdjacentHTML("afterbegin",i.sliderArray.slice(i.firstPositionSlice,i.lastPositionSlice).map((function(e){return i.getCardLayout(e)})).join("")),0===i.firstPositionSlice?(s.disabled=!0,l.disabled=!0):(s.disabled=!1,l.disabled=!1),48===i.lastPositionSlice?(d.disabled=!0,c.disabled=!0):(d.disabled=!1,c.disabled=!1)})),o(this,"calculateCardsCount",(function(){var e=i.cardsOnPageCount,t=document.body.offsetWidth;if(i.cardsOnPageCount=t<768?3:t<1280?6:8,e!==i.cardsOnPageCount){for(s.disabled=!0,l.disabled=!0,d.disabled=!1,c.disabled=!1,i.firstPositionSlice=0,i.lastPositionSlice=i.cardsOnPageCount,i.lastPage=48/i.cardsOnPageCount,i.page=1,u.textContent=1;i.slider.firstElementChild;)i.slider.firstElementChild.remove();var n=i.sliderArray.slice(0,i.cardsOnPageCount);i.slider.insertAdjacentHTML("afterbegin",n.map((function(e){return i.getCardLayout(e)})).join(""))}})),o(this,"getWidthWindow",(function(){i.windowWidth=document.body.offsetWidth,i.cardsOnPageCount=i.windowWidth<768?3:i.windowWidth<1280?6:8,i.lastPositionSlice=i.cardsOnPageCount,i.lastPage=48/i.cardsOnPageCount})),o(this,"overflowHidden",(function(){i.btn?(document.body.style.overflow="hidden",document.querySelector(".hamburger-menu__logo ").style.visibility="visible",document.querySelector(".hamburger-menu__logo ").style.right="122px",document.querySelector(".logo ").style.display="none",i.btn=!1):(document.body.style.overflow="visible",document.querySelector(".hamburger-menu__logo ").style.visibility="hidden",document.querySelector(".hamburger-menu__logo ").style.right="-100%",document.querySelector(".logo ").style.display="block",i.btn=!0)})),o(this,"initSlider",(function(){i.getWidthWindow(),window.addEventListener("resize",i.calculateCardsCount);var e=i.sliderArray.slice(0,i.cardsOnPageCount).map((function(e){return i.getCardLayout(e)}));d.addEventListener("click",(function(){return i.swipeContainer({direction:"sliderArrowRight"})})),s.addEventListener("click",(function(){return i.swipeContainer({direction:"sliderArrowleft"})})),l.addEventListener("click",(function(){return i.swipeContainer({direction:"firstPage"})})),c.addEventListener("click",(function(){return i.swipeContainer({direction:"lastPage"})})),i.slider.insertAdjacentHTML("afterbegin",e.join("")),h.addEventListener("click",i.overflowHidden)})),this.petsData=m,this.cardsOnPageCount=0,this.sliderArray=this.buildIdArray(m),this.slider=document.querySelector(a),this.firstPositionSlice=0,this.lastPositionSlice=0,this.windowWidth=0,this.translate=0,this.pagesCount=6,this.page=1,this.btn=!0,this.lastPage=0,this.calculateCardsCount=this.calculateCardsCount.bind(this)}},K0tZ:function(e){e.exports=JSON.parse('[{"id":"1","name":"Jennifer","img":"./images/jennifer.png","type":"Dog","breed":"Labrador","description":"Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.","age":"2 months","inoculations":["none"],"diseases":["none"],"parasites":["none"]},{"id":"2","name":"Sophia","img":"./images/sophia.png","type":"Dog","breed":"Shih tzu","description":"Sophia here and I\'m looking for my forever home to live out the best years of my life. I am full of energy. Everyday I\'m learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.","age":"1 month","inoculations":["parvovirus"],"diseases":["none"],"parasites":["none"]},{"id":"3","name":"Woody","img":"./images/woody.png","type":"Dog","breed":"Golden Retriever","description":"Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.","age":"3 years 6 months","inoculations":["adenovirus","distemper"],"diseases":["right back leg mobility reduced"],"parasites":["none"]},{"id":"4","name":"Scarlett","img":"./images/scarlett.png","type":"Dog","breed":"Jack Russell Terrier","description":"Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.","age":"3 months","inoculations":["parainfluenza"],"diseases":["none"],"parasites":["none"]},{"id":"5","name":"Katrine","img":"./images/katrine.png","type":"Cat","breed":"British Shorthair","description":"Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.","age":"6 months","inoculations":["panleukopenia"],"diseases":["none"],"parasites":["none"]},{"id":"6","name":"Timmy","img":"./images/timmy.png","type":"Cat","breed":"British Shorthair","description":"Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.","age":"2 years 3 months","inoculations":["calicivirus","viral rhinotracheitis"],"diseases":["kidney stones"],"parasites":["none"]},{"id":"7","name":"Freddie","img":"./images/freddie.png","type":"Cat","breed":"British Shorthair","description":"Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.","age":"2 months","inoculations":["rabies"],"diseases":["none"],"parasites":["none"]},{"id":"8","name":"Charly","img":"./images/charly.png","type":"Dog","breed":"Jack Russell Terrier","description":"This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.","age":"8 years","inoculations":["bordetella bronchiseptica","leptospirosis"],"diseases":["deafness","blindness"],"parasites":["lice","fleas"]}]')},"W+EK":function(e,t,i){"use strict";i.r(t);var n=i("K0tZ");i("iMRC");new(i("FZBc").b)({data:n,sliderSelector:".slider-box"}).initSlider()},iMRC:function(e,t,i){"use strict";var n=i("K0tZ"),a=document.querySelector(".slider-box");a.addEventListener("click",(function(e){var t=e.target.closest(".slider-item");if(document.body.style.overflow="hidden",t){var i=function(e){var t=n.find((function(t){return t.id===e}));return'\n  <div class="slider-description" data-set="action">\n  <img src="./assets/modal_close_button.png" class="modal_close_button">\n    <div class="description-container">\n      <img src="'.concat(t.img,'" alt="" class="slider-item__img">\n        <div class="slider-item__info">\n          <div class="pets-title">\n            <h3 class="pets-name">').concat(t.name,'</h3>\n            <h4 class="pets-breed">').concat(t.type," - ").concat(t.breed,"</h4>\n          </div>\n          <p>").concat(t.description,'</p>\n          <ul class="list-description">\n            <li class="list-item"><span class="color-font">Age: ').concat(t.age,'</span></li>\n            <li class="list-item"><span class="color-font">Inoculations: ').concat(t.inoculations,'</span></li>\n            <li class="list-item"><span class="color-font">Diseases: ').concat(t.diseases,'</span></li>\n            <li class="list-item"><span class="color-font">Parasites: ').concat(t.parasites,"</span></li>\n          </ul>\n        </div>\n    </div>\n  </div>")}(t.dataset.id);document.body.insertAdjacentHTML("beforeend",i);var a=document.querySelector(".slider-description");a.addEventListener("click",(function(e){e.target.closest(".description-container")||(a.remove(),document.body.style.overflow="visible")}))}}))}},[["W+EK",0]]]);