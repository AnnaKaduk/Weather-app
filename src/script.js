function getSelectedCityInfo(response) {
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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  let description = document.querySelector("#weatherDescription");
  description.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#weatherIcon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  let temp = document.querySelector("#cityCurrentTemp");
  temp.innerHTML = Math.round(response.data.main.temp);

  celsiusTemperature = response.data.main.temp;

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

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "2efb460bce75be2c0490e210e9cf0816";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector("#cityCurrentTemp");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  fahrenheitElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let TemperatureElement = document.querySelector("#cityCurrentTemp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  TemperatureElement.innerHTML = Math.round(celsiusTemperature);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col-2">
          <h5 class="next-day">${formatDay(forecastDay.dt)}</h5>
          <div class="next-days-icon">
          <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width = 60px
          >
          </div>
          <div class="next-days-weather-range">
            <span class="next-days-max-temp">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="next-days-min-temp">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
       </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let btnSearch = document.querySelector(".search-form");
btnSearch.addEventListener("submit", searchCity);

let btnGeolocation = document.querySelector("#btnImHere");
btnGeolocation.addEventListener("click", showCurrentCity);
