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

function changeUnit() {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `100ºF`;
}
fahrenheit.addEventListener("click", changeUnit);

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML =
    Math.round(response.data.main.temp) + "ºC";
}

function searchCity(city) {
  let apiKey = "98a75b44ef40d2758688b751e4f7d20b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
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
