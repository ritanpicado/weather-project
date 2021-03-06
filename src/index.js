let now = new Date();

let dates = document.querySelector("h4");

let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

dates.innerHTML = `${day}, ${hours}:${minutes}`;
console.log(dates);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#Search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let searchIcon = document.querySelector("seach-bar");
form.addEventListener("click", search);

let celsius = document.querySelector("#celsius-link");
let fahrenheit = document.querySelector("#fahrenheit-link");

function formatHours(timestamp) {
  let now = new Date(timestamp);

  let dates = document.querySelector("h4");

  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayFahrenheitTemperature() {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElemment = document.querySelector("h2");
  temperatureElemment.innerHTML = Math.round(fahrenheitTemperature) + "ºF";
}

function displayCelsiusTemperature() {
  event.preventDefault();
  let temperatureElemment = document.querySelector("h2");
  temperatureElemment.innerHTML = Math.round(celsiusTemperature) + "ºC";
}
let celsiusTemperature = null;

celsius.addEventListener("click", displayCelsiusTemperature);
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML =
    Math.round(response.data.main.temp) + "ºC";
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  forecastElement.innerHTML = `
  <div class="col-2">
    ${formatHours(forecast.dt * 1000)}
    <br />
    ${Math.round(forecast.main.temp_max)}º  | ${Math.round(
    forecast.main.temp_min
  )}º
    <div>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="Sunny" id="icon" width="70px" />
   </div>
  </div>`;
  forecast = response.data.list[1];
  forecastElement.innerHTML += `
  <div class="col-2">
    ${formatHours(forecast.dt * 1000)}
    <br />
    ${Math.round(forecast.main.temp_max)}º  | ${Math.round(
    forecast.main.temp_min
  )}º
    <div>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="Sunny" id="icon" width="70px" />
   </div>
  </div>`;
  forecast = response.data.list[2];
  forecastElement.innerHTML += `
  <div class="col-2">
    ${formatHours(forecast.dt * 1000)}
    <br />
    ${Math.round(forecast.main.temp_max)}º  | ${Math.round(
    forecast.main.temp_min
  )}º
    <div>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="Sunny" id="icon" width="70px" />
   </div>
  </div>`;
  forecast = response.data.list[3];
  forecastElement.innerHTML += `
  <div class="col-2">
    ${formatHours(forecast.dt * 1000)}
    <br />
    ${Math.round(forecast.main.temp_max)}º  | ${Math.round(
    forecast.main.temp_min
  )}º
    <div>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="Sunny" id="icon" width="70px" />
   </div>
  </div>`;
  forecast = response.data.list[4];
  forecastElement.innerHTML += `
  <div class="col-2">
    ${formatHours(forecast.dt * 1000)}
    <br />
    ${Math.round(forecast.main.temp_max)}º  | ${Math.round(
    forecast.main.temp_min
  )}º
    <div>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="Sunny" id="icon" width="70px" />
   </div>
  </div>`;
}

function searchCity(city) {
  let apiKey = "98a75b44ef40d2758688b751e4f7d20b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#Search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "98a75b44ef40d2758688b751e4f7d20b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Rome");
