(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{D5yX:function(e,t,s){"use strict";s.r(t);var n={isMenuShow:!0,isPlayPause:!0,isSoundOnOff:!0,sizeGame:4,oldSize:4,cells:[],sec:0,min:0,counterMove:0,rotate:0,empty:{value:0,top:0,left:0},BASIC_SIZE_FONT:6,OFFSET_MENU_HIDDEN:-391};document.body.insertAdjacentHTML("afterbegin",'\t\t<section class="page">\n    <div class="menu">\n    <img class="pause visible" src="./assets/home.png" title = "menu">\n    <div class="menu-wrapper">\n      <ul class="menu-list">\n      <li class="menu-item play-game">Continue</li>\n\t\t\t\t<li class="menu-item new-game">New Game</li>\n        <li class="menu-item save-game">Saved games</li>\n        <li class="menu-item load-game">load Game</li>\n        <li class="menu-item settings">Settings</li>\n        <li class="menu-item field-size__box field-size__box_display">\n\t          <label class="nav__btn">Field size: </label>\n\t          <select class="select-box">\n\t\t          <option class="select-option" value="3">3x3</option>\n\t\t          <option class="select-option" value="4" selected="">4x4</option>\n\t\t          <option class="select-option" value="5">5x5</option>\n\t\t          <option class="select-option" value="6">6x6</option>\n\t\t          <option class="select-option" value="7">7x7</option>\n\t\t          <option class="select-option" value="8">8x8</option>\n\t          </select>\n        </li>\n\t\t\t\t<li class="menu-item best-scores">Best scores</li>\n      </ul>\n      \n\t\t</div>\n\t\t</div>\n\t\t<div class="content-box">\n\t\t\t<div class="control-wrap">\n\t\t\t\t<div class="info">\n\t\t\t\t\t<span class="description">Time </span>\n\t\t\t\t\t<span class="timer">00:00</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="moves">\n\t\t\t\t\t<span class="description">Moves</span>\n\t\t\t\t\t<span class="counter">0</span>\n\t\t\t\t</div>\n        <img class="restart-game" src="./assets/47-512.png" title = "restart">\n        <audio src="./assets/audio.mp3" class="audio-play" type="audio/mp3"></audio>\n        <div class="volume"></div>\t\t\n        </div>\n        <div class="field field-font__size_l">\n        </div>\n\t\t</div>\n\t</section>');const l=document.querySelector(".select-box"),a=document.querySelector(".restart-game"),i=document.querySelector(".field"),o=document.querySelector(".timer"),c=document.querySelector(".counter"),r=document.querySelector(".pause"),m=document.querySelector(".menu"),u=document.querySelector(".play-game"),d=document.querySelector(".new-game"),p=document.querySelector(".settings"),_=document.querySelector(".save-game"),v=document.querySelector(".load-game"),f=document.querySelector(".best-scores"),y=document.querySelector(".field-size__box"),g=document.querySelector(".menu-wrapper"),b=document.querySelector(".menu-list"),S=document.querySelector(".volume");var L=function(){if(n.isPlayPause){if(n.sec>59)return n.min+=1,void(n.sec=0);n.sec<10&&n.min<10?o.innerHTML=`0${n.min}:0${n.sec}`:n.sec>9&&n.min<10?o.innerHTML=`0${n.min}:${n.sec}`:o.innerHTML=`${n.min}:${n.sec}`,n.sec+=1}};var x=function(){m.offsetLeft,n.OFFSET_MENU_HIDDEN,m.classList.toggle("menu_opacity"),document.querySelector(".content-box").classList.toggle("content-box__scale")};const h=null===JSON.parse(localStorage.getItem("itemCache"))?{timer:[],"move counter":[],"Board size":[],"array cells":[],empty:[]}:JSON.parse(localStorage.getItem("itemCache")),q=null===JSON.parse(localStorage.getItem("bestScores"))?{date:[],move:[],size:[],time:[]}:JSON.parse(localStorage.getItem("bestScores"));function z(e,t){const s=n.cells[e],l=Math.abs(n.empty.left-s.left),a=Math.abs(n.empty.top-s.top),i=n.empty.left,r=n.empty.top;if(l+a>1)return s.element.style.left=s.left*t+"px",void(s.element.style.top=s.top*t+"px");!function(){if(n.isSoundOnOff){const e=document.querySelector(".audio-play");e.src="./assets/audio.mp3",e.pause(),e.play()}}(n.isSoundOnOff),n.counterMove+=1,c.innerHTML=n.counterMove,s.element.style.left=n.empty.left*t+"px",s.element.style.top=n.empty.top*t+"px",n.empty.left=s.left,n.empty.top=s.top,s.left=i,s.top=r;n.cells.every(e=>!e.value&&e.top===n.sizeGame-1||(e.value?e.value===e.top*n.sizeGame+e.left+1:e.value===e.top*n.sizeGame+e.left))&&(!function(){const e=new Date,t=e.toLocaleDateString(),s=e.toLocaleTimeString();q.date.push([s,t]),q.time.push(o.innerHTML),q.move.push(+c.innerHTML),q.size.push(n.sizeGame),localStorage.setItem("bestScores",JSON.stringify(q))}(),setTimeout(()=>{alert(`Ура! Вы решили головоломку за ${o.innerHTML} и ${n.counterMove} ходов`)},500))}function E(){p.classList.toggle("menu-item__anime"),y.classList.toggle("field-size__box_display")}function M(){return[...Array(n.sizeGame*n.sizeGame-1).keys()].sort(()=>Math.random()-.5)}function T(e){e>n.BASIC_SIZE_FONT?(i.classList.add("field-font__size_s"),i.classList.remove("field-font__size_l")):(i.classList.remove("field-font__size_s"),i.classList.add("field-font__size_l"))}function k(e,t){const s=i.offsetWidth/t,l=i.offsetHeight/t;i.style.gridTemplateColumns=`repeat(${t}, 1fr);`;for(let a=1;a<t*t;a+=1){const o=document.createElement("div");o.className="field-item";const c=e[a-1]+1;o.innerHTML=c;const r=a%t,m=(a-r)/t;n.cells.push({value:c,left:r,top:m,element:o}),o.style.left=r*s+"px",o.style.top=m*s+"px",i.append(o),o.style.width=s+"px",o.style.height=l+"px",o.addEventListener("click",()=>{z(a,s)})}}S.addEventListener("click",()=>(n.isSoundOnOff,S.classList.toggle("volume-on"),void(n.isSoundOnOff=!n.isSoundOnOff)));var N=function(e){n.rotate+=360,a.style.transform=`rotate(-${n.rotate}deg)`,i.innerHTML="",n.min=0,n.sec=0,n.counterMove=0,c.innerHTML=0,n.empty={value:0,top:0,left:0},n.cells=[],n.cells.push(n.empty),k(M(),e),T(e)};var $=function(){document.querySelector(".best-scores__box")&&document.querySelector(".best-scores__box").remove(),b.classList.toggle("menu-list_offset-left"),setTimeout(()=>{b.classList.toggle("menu-list_none")},1e3),m.classList.toggle("menu_offset-right-0"),g.classList.toggle("menu-scores__change"),setTimeout(()=>{!function(){g.insertAdjacentHTML("beforeEnd",'<div class="best-scores__box">\n        <button class="menu-back__button_scores"></button>\n        <h2 class="best-scores__title">Best scores</h2>\n        <h3 class="scores-title__description">\n            <span class="scores-title__date">\n              Date\n            </span>\n            <span class="scores-title__moves">\n             Moves \n             </span>\n             <span class="scores-title__size">\n             Size\n            </span>\n            <span class="scores-title__time">\n             Time\n             </span>\n          </h3>     \n      <ul class="scores-list">\n      </ul>\n  </div>');for(let e=0;e<q.time.length;e+=1)document.querySelector(".scores-list").insertAdjacentHTML("beforeEnd",`<li class="scores-list__item" data-index = ${e}>\n        <span class="scores-title__date">\n        <span class="score-item__numbering"> ${e+1} </span>\n         <span class="score-item__hour">${q.date[e][0]}</span> </br> \n      <span class="score-item__date">${q.date[e][1]}\n        </span></span>\n        <span class="scores-title__moves">\n        ${q.move[e]}\n        </span>\n        <span class="scores-title__size">\n        ${q.size[e]}\n        </span>\n        <span class="scores-title__time">\n        ${q.time[e]}\n        </span>\n      </li>`)}(),document.querySelector(".menu-back__button_scores").addEventListener("click",()=>{b.classList.toggle("menu-list_none"),setTimeout(()=>{b.classList.toggle("menu-list_offset-left"),m.classList.remove("menu_offset-right-0")},300),g.classList.toggle("menu-scores__change"),document.querySelector(".best-scores__box").classList.toggle("best-scores__box_none")})},1e3)};n.cells.push(n.empty),document.addEventListener("DOMContentLoaded",(setInterval(()=>L(n.isPlayPause),1e3),k(M(),n.sizeGame),l.addEventListener("change",e=>{n.sizeGame=+e.target.value}),u.addEventListener("click",()=>{x(),n.isPlayPause=!0,setInterval(L(n.isPlayPause),1e3)}),_.addEventListener("click",()=>{_.classList.add("save-game__btn"),setTimeout(()=>{_.classList.remove("save-game__btn")},1e3),n.sizeGame,n.cells,h.timer.push(o.innerHTML),h["move counter"].push(+c.innerHTML),h["Board size"].push(n.sizeGame),h["array cells"].push(n.cells),h.empty.push(n.empty),localStorage.setItem("itemCache",JSON.stringify(h))}),a.addEventListener("click",()=>N(n.oldSize)),d.addEventListener("click",()=>{N(n.sizeGame),n.oldSize=n.sizeGame,x(),n.isPlayPause=!0,setInterval(L(n.isPlayPause),1e3)}),r.addEventListener("click",()=>{x(),n.isPlayPause=!n.isPlayPause,setInterval(L(n.isPlayPause),1e3)}),p.addEventListener("click",E),v.addEventListener("click",()=>{!function(){document.querySelector(".menu-list").classList.toggle("menu-list_hidden"),document.querySelector(".save-list")&&(document.querySelector(".save-list").innerHTML="",document.querySelector(".save-list__box").remove());const e=document.createElement("div");e.className="save-list__box",document.querySelector(".menu-wrapper").append(e);const t=document.createElement("ul");t.className="save-list",document.querySelector(".save-list__box").append(t);const s=document.createElement("button");s.className="menu-back__button",document.querySelector(".save-list__box").append(s);const n=document.createElement("button");n.className="download-button",document.querySelector(".save-list__box").append(n);for(let e=0;e<h.timer.length;e+=1)document.querySelector(".save-list").insertAdjacentHTML("beforeEnd",`<li class="save-list__item" data-index = ${e}>\n\t\t\t\t<div class="save-item__name">\n          <img src="./assets/55899ca177a419ff0334fd84_Arrow10.png" alt="back-save-item" title="back-save-item" class="back-save__item" data-index = ${e}>\n          <span\tclass="save-title">Save Game - <span>${e+1}</span></span>\n\t\t\t\t\t<img src="./assets/55899ca177a419ff0334fd84_Arrow10.png" alt="next-save-item" title="next-save-item" class="next-save__item"  data-index = ${e}>\n\t\t\t\t</div>\n\t\t\t\t<div class="save-item__description">\n\t\t\t\t\t<span class="board-size__load">Board size: ${h["Board size"][e]}x${h["Board size"][e]}</span>\n\t\t\t\t\t<span class="time-game__load">time ${h.timer[e]}</span>\n\t\t\t\t\t<span class="move-game__load">move  ${h["move counter"][e]}</span>\n\t\t\t\t</div>\n\t\t\t</li>`),e||document.querySelector(".save-list__item").classList.add("save-list__item_active");setTimeout(()=>{document.querySelector(".save-list__box").classList.toggle("save-list__box_visible")},1e3)}();const e=Array.from(document.querySelectorAll(".save-list__item"));document.querySelector(".save-list").addEventListener("click",({target:t})=>function(e,t){const s=Number(e.dataset.index);"next-save__item"===e.className&&s!==t.length-1&&(t[s].classList.remove("save-list__item_active"),t[s+1].classList.add("save-list__item_active")),"back-save__item"===e.className&&0!==s&&(t[s].classList.remove("save-list__item_active"),t[s-1].classList.add("save-list__item_active"))}(t,e)),document.querySelector(".menu-back__button").addEventListener("click",()=>{document.querySelector(".save-list__box").classList.toggle("save-list__box_none"),b.classList.toggle("menu-list_hidden")}),document.querySelector(".download-button").addEventListener("click",()=>{const e=document.querySelector(".save-list__item_active"),t=Number(e.dataset.index);n.empty=h.empty[t],function({size:e,arrayCells:t,index:s}){o.innerHTML=h.timer[s],n.min=Number(h.timer[s].substr(0,2)),n.sec=Number(h.timer[s].substr(3,2)),n.counterMove=Number(h["move counter"][s]),c.innerHTML=h["move counter"][s],i.innerHTML="";let l=[];n.cells=[],l=t.map(e=>e.value);const a=i.offsetWidth/e,r=i.offsetHeight/e;i.style.gridTemplateColumns=`repeat(${e}, 1fr);`;for(let s=1;s<e*e;s+=1){const e=document.createElement("div");e.className="field-item",e.innerHTML=l[s],console.log("arrayCells[i].left",t[s].left),n.cells.push({value:l[s],left:t[s].left,top:t[s].top,element:e}),e.style.left=t[s].left*a+"px",e.style.top=t[s].top*a+"px",i.append(e),e.style.width=a+"px",e.style.height=r+"px",e.addEventListener("click",()=>{z(s-1,a)})}T(e)}({size:h["Board size"][t],arrayCells:h["array cells"][t],index:t})})}),f.addEventListener("click",()=>{$()}),void i.addEventListener("mousedown",e=>function(e){const{target:t}=e;if(!t.classList.contains("field-item"))return;const s=e.layerX,n=e.layerY,l=i.getBoundingClientRect().left,a=i.getBoundingClientRect().top;function o(e,i){t.classList.add("field-item_animation"),t.style.left=e-l-s+"px",t.style.top=i-a-n+"px"}function c(e){o(e.clientX,e.clientY)}o(e.clientX,e.clientY),document.addEventListener("mousemove",c),i.onmouseup=()=>{document.removeEventListener("mousemove",c),t.onmouseup=null,t.classList.remove("field-item_animation")}}(e))))}},[["D5yX",1]]]);