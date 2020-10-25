// DOM Elements
const time = document.querySelector(".time"),
  greeting = document.querySelector(".greeting"),
  name = document.querySelector(".name"),
  focus = document.querySelector(".focus"),
  day = document.querySelector(".date"),
  btn = document.querySelector(".btn"),
  blockquote = document.querySelector("blockquote"),
  figcaption = document.querySelector("figcaption"),
  btnQuote = document.querySelector(".btn-quote"),
  weatherIcon = document.querySelector(".weather-icon"),
  temperature = document.querySelector(".temperature"),
  weatherDescription = document.querySelector(".weather-description"),
  city = document.querySelector(".city"),
  wind = document.querySelector(".wind"),
  humidity = document.querySelector(".humidity");

let currentHour = 0,
  index = 0,
  counter = 0,
  imageIndex = 0,
  dayTimeIndex = 0,
  currentImagePathIndex = 0;

const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
]
  .sort(() => Math.random() - 0.5)
  .slice(0, 6);

const imagesPaths = ["night", "morning", "day", "evening"];

async function getWeather() {
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=3160ae251d6d8c4c8b5b229b661028d5&units=metric`;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=9c5da7e0baec7ef80674d09f43a9840d&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    // temperature.textContent = ;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
    wind.textContent = `Скорость ветра: ${data.wind.speed} m/c`;
  } catch {
    weatherDescription.textContent = "Error";
    humidity.textContent = "Влажность: не найдено";
    wind.textContent = "Скорость ветра: не найдено";
  }
}

document.addEventListener("DOMContentLoaded", getWeather);

btn.addEventListener("click", () => {
  const result = showNextImage(images, imagesPaths, dayTimeIndex, imageIndex);
  dayTimeIndex = result[0];
  imageIndex = result[1];
  btn.disabled = true;
  setTimeout(function () {
    btn.disabled = false;
  }, 1000);
});

async function getQuote() {
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}
document.addEventListener("DOMContentLoaded", getQuote);
btnQuote.addEventListener("click", getQuote);

// Options
const showAmPm = true;

function showNextImage(images, imagesPaths, dayTimeIndex, imageIndex) {
  document.body.style.backgroundImage = `url('./assets/images/${imagesPaths[dayTimeIndex]}/${images[imageIndex]}')`;

  if (imageIndex === 5) {
    dayTimeIndex = (dayTimeIndex + 1) % 4;
    imageIndex = 0;
  } else {
    imageIndex++;
  }

  return [dayTimeIndex, imageIndex];
}

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";
  day.innerHTML = today.toLocaleString("en-En", options);

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ""}`;
  setBgGreet();

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour > 6 && hour < 12) {
    // Morning
    if (currentHour !== hour) {
      document.body.style.backgroundImage = `url('./assets/images/morning/${
        images[hour - 6]
      }')`;
      currentHour = hour;
    }

    greeting.textContent = "Good Morning, ";
  } else if (hour > 12 && hour < 18) {
    // Afternoon
    if (currentHour !== hour) {
      document.body.style.backgroundImage = `url('./assets/images/day/${
        images[hour - 12]
      }')`;
      currentHour = hour;
    }
    greeting.textContent = "Good Afternoon, ";
  } else if (hour >= 18 && hour < 24) {
    // Evening
    if (currentHour !== hour) {
      document.body.style.backgroundImage = `url('./assets/images/evening/${
        images[hour - 18]
      }')`;
      currentHour = hour;
    }
    greeting.textContent = "Good Evening, ";
    document.body.style.color = "white";
  } else if (hour > 24 && hour < 6) {
    // Evening
    if (currentHour !== hour) {
      document.body.style.backgroundImage = `url('./assets/images/night/${
        images[hour - 6]
      }')`;
      currentHour = hour;
    }
    greeting.textContent = "Good Night, ";
    document.body.style.color = "white";
  }
}

// Get Name
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// Set Name
function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else if (e.target.innerText) {
    localStorage.setItem("name", e.target.innerText);
  } else {
    name.textContent = "[Enter Name]";
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else if (e.target.innerText) {
    localStorage.setItem("focus", e.target.innerText);
  } else {
    focus.textContent = "[Enter Focus]";
  }
}

// function setCity(e) {
//   if (e.type === "keypress") {
//     // Make sure enter is pressed
//     if (e.which == 13 || e.keyCode == 13) {
//       localStorage.setItem("inputCity", e.target.innerText);
//       city.blur();
//     } else {
//       focus.textContent = "[Enter Focus]";
//     }
//   }
// }

function setCity(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("inputCity", e.target.textContent);
      getWeather();
      city.blur();
    }
  } else if (e.target.textContent) {
    localStorage.setItem("inputCity", e.target.textContent);
  } else {
    city.textContent = "[Enter City]";
  }
  // if (e.type === "keypress") {
  //   // Make sure enter is pressed
  //   if (e.target.innerText) {
  //     localStorage.setItem("inputCity", e.target.innerText);
  //     getWeather();
  //     city.blur();
  //   }
  // } else {
  //   city.textContent = "[Enter City]";
  // }
}

function getCity() {
  if (localStorage.getItem("inputCity") === null) {
    city.textContent = "[Enter City]";
  } else {
    city.textContent = localStorage.getItem("inputCity");
  }
}

function clearName() {
  name.innerHTML = "";
}

function clearTextFocus() {
  focus.innerHTML = "";
}

function clearNameCity() {
  city.innerHTML = "";
}

name.addEventListener("keypress", setName);
name.addEventListener("click", clearName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("click", clearTextFocus);
city.addEventListener("keypress", setCity);
city.addEventListener("click", clearNameCity);
city.addEventListener("blur", getCity);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getCity();
// getWeather();
// function showNextImage1(images, imagesPaths, counter) {
//   let dayTimeIndex = 0;
//   if (counter >= 0 && counter < 6) {
//     dayTimeIndex = 0;
//   } else if (counter >= 6 && counter < 12) {
//     dayTimeIndex = 1;
//   } else if (counter >= 12 && counter < 18) {
//     dayTimeIndex = 2;
//   } else if (counter >= 18 && counter < 24) {
//     dayTimeIndex = 3;
//   }

// document.body.style.backgroundImage = `url('./assets/images/${
//   imagesPaths[dayTimeIndex]
// }/${images[counter % 6]}')`;

//   return counter + 1;
// }

// Show Time
