//Celsius & Fahrenheit

function changeCelcius(event) {
  event.preventDefault();
  let celciusDegrees = document.querySelector("#numberDegrees");
  celciusDegrees.innerHTML = 15;
}
let cDegree = document.querySelector("#celcius");
cDegree.addEventListener("click", changeCelcius);

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitDegrees = document.querySelector("#numberDegrees");
  fahrenheitDegrees.innerHTML = 35;
}
let fDegree = document.querySelector("#fahrenheit");
fDegree.addEventListener("click", changeFahrenheit);

//Time and Day

let now = new Date();

function currentTime() {
  let time = `🕰️ ${now.getHours()}:${
    (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
  }`;
  return time;
}
let currentHour = document.querySelector("#current-hour");
currentHour.innerHTML = `${currentTime()}`;

function currentToday() {
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
  let date = `📆 ${day}`;
  return date;
}

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${currentToday()}`;

//Search button

let apiKey = "afacbafb576509c320fcd30e6a25dc9d";

function searchCityLocation(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#whatcity");
  let searchedCity = document.querySelector("#current-city");
  searchedCity.innerHTML = `${cityInput.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  function searchLocation(response) {
    let temperature = Math.round(response.data.main.temp);

    let cityTemperature = document.querySelector("#numberDegrees");
    cityTemperature.innerHTML = `${temperature}`;

    let weatherDescription = response.data.weather[0].description;
    let weatherDescriptionElement = document.querySelector("#description");
    weatherDescriptionElement.innerHTML = `${weatherDescription}`;
  }
  axios.get(apiUrl).then(searchLocation);
}

let searchCity = document.querySelector("#cities");
searchCity.addEventListener("submit", searchCityLocation);

//Current location button

function searchingCurrentLocation() {
  function searchCurrentLocation(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let currentCityLocation = document.querySelector("#current-city");
    currentCityLocation.innerHTML = `${response.data.name}`;
    let currentLocationTemperature = document.querySelector("#numberDegrees");
    currentLocationTemperature.innerHTML = `${currentTemperature}`;
  }
  function showLocationTemperature(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let geoPlace = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(geoPlace).then(searchCurrentLocation);
  }

  navigator.geolocation.getCurrentPosition(showLocationTemperature);
}

let currentLocation = document.querySelector(".current-location-button");
currentLocation.addEventListener("click", searchingCurrentLocation);
