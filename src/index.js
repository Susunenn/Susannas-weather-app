//Time and Day
let now = new Date();

function currentTime() {
  let time = `${now.getHours()}:${
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
  let date = `${day}`;
  return date;
}

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${currentToday()}`;

function sunTime(timestamp) {
  let sunTimes = new Date(timestamp * 1000);
  let sunTimeElement = `${sunTimes.getHours()}:${
    (sunTimes.getMinutes() < 10 ? "0" : "") + sunTimes.getMinutes()
  }`;

  return sunTimeElement;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function formatHour(timestamp) {
  let hour = new Date(timestamp * 1000);
  let hours = `${hour.getHours()}.00`;

  return hours;
}

//Later today
function showWeatherLaterToday(response) {
  let weatherLaterToday = response.data.hourly;
  let weatherLaterTodayElement = document.querySelector("#weatherToday");
  let laterTodayHTML = `<div class="row today">`;
  weatherLaterToday.forEach(function (laterToday, index) {
    if (index < 12) {
      laterTodayHTML =
        laterTodayHTML +
        `<ul class="col-1">
              <li class="hour">${formatHour(laterToday.dt)}</li>
              <li><img src="http://openweathermap.org/img/wn/${
                laterToday.weather[0].icon
              }@2x.png" alt="weather-icons" id="weather-icon" class="later-weather-icon"></img></li>    
              <li>${Math.round(laterToday.temp)}°</li>  
            </ul>`;
    }
  });
  laterTodayHTML = laterTodayHTML + `</div>`;
  weatherLaterTodayElement.innerHTML = laterTodayHTML;

  //console.log(response.data.hourly[0]);
}

//Later this week
function showWeatherForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<ul class="col-2">
        <li class="forecast-date forecast-slot">${formatDay(
          forecastDay.dt
        )}</li>
        <li class="forecast-slot"><img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="weather-icons" id="weather-icon" class="forecast-icon"></img></li>    
        <li class="forecast-temperature forecast-slot">${Math.round(
          forecastDay.temp.max
        )}° | <small class="low-temp">${Math.round(
          forecastDay.temp.min
        )}°</small></li>  
      </ul>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let apiKey = "afacbafb576509c320fcd30e6a25dc9d";

//Starting city

function startCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showLaterToday(coordinates) {
    let laterTodayApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(laterTodayApiUrl).then(showWeatherLaterToday);
  }

  function showForecast(coordinates) {
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(forecastApiUrl).then(showWeatherForecast);
  }

  function formatTime(timestamp) {
    let time = new Date(timestamp);
    let hours = time.getHours();
    let minutes = time.getMinutes();

    return `${hours}:${minutes}`;
  }

  function searchLocation(response) {
    let searchedCityName = document.querySelector("#current-city");
    searchedCityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

    celsius = response.data.main.temp;

    let cityTemperature = document.querySelector("#numberDegrees");
    cityTemperature.innerHTML = `${Math.round(celsius)}`;

    let weatherDescriptionElement = document.querySelector("#description");
    weatherDescriptionElement.innerHTML = `${response.data.weather[0].description}`;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.main.humidity}`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

    let feelsLikeElement = document.querySelector("#feels-like");
    feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}`;

    let sunriseElement = document.querySelector("#sunrise");
    sunriseElement.innerHTML = `${sunTime(response.data.sys.sunrise)}`;

    let sunsetElement = document.querySelector("#sunset");
    sunsetElement.innerHTML = `${sunTime(response.data.sys.sunset)}`;

    let hourElement = document.querySelector("#current-hour");
    hourElement.innerHTML = formatTime(response.data.dt * 1000);

    let weatherIcons = document.querySelector("#weather-icon");
    weatherIcons.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcons.setAttribute("alt", response.data.weather[0].description);

    showForecast(response.data.coord);
    showLaterToday(response.data.coord);
  }
  axios.get(apiUrl).then(searchLocation);
}

startCity("Kärkölä");

//Search button

function searchCityLocation(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#whatcity");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  function showLaterToday(coordinates) {
    let laterTodayApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(laterTodayApiUrl).then(showWeatherLaterToday);
  }

  function showForecast(coordinates) {
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(forecastApiUrl).then(showWeatherForecast);
  }

  function formatTime(timestamp) {
    let time = new Date(timestamp);
    let hours = time.getHours();
    let minutes = time.getMinutes();

    return `${hours}:${minutes}`;
  }

  function searchLocation(response) {
    let searchedCityName = document.querySelector("#current-city");
    searchedCityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

    celsius = response.data.main.temp;

    let cityTemperature = document.querySelector("#numberDegrees");
    cityTemperature.innerHTML = `${Math.round(celsius)}`;

    let weatherDescriptionElement = document.querySelector("#description");
    weatherDescriptionElement.innerHTML = `${response.data.weather[0].description}`;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.main.humidity}`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

    let feelsLikeElement = document.querySelector("#feels-like");
    feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}`;

    let sunriseElement = document.querySelector("#sunrise");
    sunriseElement.innerHTML = `${sunTime(response.data.sys.sunrise)}`;

    let sunsetElement = document.querySelector("#sunset");
    sunsetElement.innerHTML = `${sunTime(response.data.sys.sunset)}`;

    let hourElement = document.querySelector("#current-hour");
    hourElement.innerHTML = formatTime(response.data.dt * 1000);

    let weatherIcons = document.querySelector("#weather-icon");
    weatherIcons.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcons.setAttribute("alt", response.data.weather[0].description);

    showForecast(response.data.coord);
    showLaterToday(response.data.coord);
  }
  axios.get(apiUrl).then(searchLocation);
}

let searchCity = document.querySelector("#cities");
searchCity.addEventListener("submit", searchCityLocation);

//Current location button

function searchingCurrentLocation() {
  function showLaterToday(coordinates) {
    let laterTodayApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(laterTodayApiUrl).then(showWeatherLaterToday);
  }

  function showForecast(coordinates) {
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(forecastApiUrl).then(showWeatherForecast);
  }

  function searchCurrentLocation(response) {
    let currentCityLocation = document.querySelector("#current-city");
    currentCityLocation.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

    celsius = response.data.main.temp;

    let currentLocationTemperature = document.querySelector("#numberDegrees");
    currentLocationTemperature.innerHTML = `${Math.round(celsius)}`;

    let currentWeatherDescriptionElement =
      document.querySelector("#description");
    currentWeatherDescriptionElement.innerHTML = `${response.data.weather[0].description}`;

    let currentHumidityElement = document.querySelector("#humidity");
    currentHumidityElement.innerHTML = `${response.data.main.humidity}`;

    let currentWindElement = document.querySelector("#wind");
    currentWindElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

    let currentFeelsLikeElement = document.querySelector("#feels-like");
    currentFeelsLikeElement.innerHTML = `${Math.round(
      response.data.main.feels_like
    )}`;

    let currentSunriseElement = document.querySelector("#sunrise");
    currentSunriseElement.innerHTML = `${sunTime(response.data.sys.sunrise)}`;

    let currentSunsetElement = document.querySelector("#sunset");
    currentSunsetElement.innerHTML = `${sunTime(response.data.sys.sunset)}`;

    let currentWeatherIcons = document.querySelector("#weather-icon");
    currentWeatherIcons.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    currentWeatherIcons.setAttribute(
      "alt",
      response.data.weather[0].description
    );

    showForecast(response.data.coord);
    showLaterToday(response.data.coord);

    //Add correct time
    //console.log(response.data.dt);
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

//Units
function showFahrenheit(event) {
  event.preventDefault();
  let degreeUnits = document.querySelector("#numberDegrees");
  celsiusLink.classList.remove("celsius");
  celsiusLink.classList.add("fahrenheit");
  fahrenheitLink.classList.remove("fahrenheit");
  fahrenheitLink.classList.add("celsius");
  let fahrenheitTemperature = (celsius * 9) / 5 + 32;
  degreeUnits.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let degreeUnits = document.querySelector("#numberDegrees");
  celsiusLink.classList.add("celsius");
  celsiusLink.classList.remove("fahrenheit");
  fahrenheitLink.classList.remove("celsius");
  fahrenheitLink.classList.add("fahrenheit");
  degreeUnits.innerHTML = Math.round(celsius);
}

let celsius = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
