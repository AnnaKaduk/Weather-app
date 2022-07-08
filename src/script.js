function getSelectedCityInfo(response) {
  console.log(response);
  console.log(response.data.main.temp);
  console.log(response.data.main.humidity);
  console.log(response.data.wind.speed);
  console.log(response.data.sys.sunrise);
  console.log(response.data.sys.sunset);

  let now = new Date();
  let year = now.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Tue", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let currentdate = document.querySelector("#currentDate");
  currentdate.innerHTML = `${day} ${hours}:${minutes}, ${date} ${month} ${year}`;

  let temp = document.querySelector("#cityCurrentTemp");
  temp.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windSpeed = document.querySelector(".windSpeed");
  let speed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind: ${speed} m/s`;

  let sunrise = document.querySelector(".sunrise");
  let sec = response.data.sys.sunrise;
  let suriseTime = new Date(sec * 1000);
  let timesrs = suriseTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  sunrise.innerHTML = `Sunrise: ${timesrs}`;

  let sunset = document.querySelector(".sunset");
  let sec1 = response.data.sys.sunset;
  let susetTime = new Date(sec1 * 1000);
  let timesst = susetTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  sunset.innerHTML = `Sunset: ${timesst}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let apiKey = "2efb460bce75be2c0490e210e9cf0816";
  let tempUnit = "metric";
  let city = `${cityInput.value}`;
  if (cityInput.value) {
  } else {
    alert(`Please, enter a city`);
  }
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${tempUnit}`;
  axios.get(apiURL).then(getSelectedCityInfo);
}

let btnSearch = document.querySelector(".search-form");
btnSearch.addEventListener("submit", searchCity);

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2efb460bce75be2c0490e210e9cf0816";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getSelectedCityInfo);
}

function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let btnGeolocation = document.querySelector("#btnImHere");
btnGeolocation.addEventListener("click", showCurrentCity);
