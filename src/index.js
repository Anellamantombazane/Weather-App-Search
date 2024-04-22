function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-weather-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class= "current-weather-temperature-icon"/>`;
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "cf5fo805a314e7b0e5d7t87febb8a29a";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function searchEngine(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  searchCity(searchFormInput.value);
}
function displayForecast() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
        <div class="weather-forecast-day"> 
            <div class="weather-forecast-date">${day}</div> 
            <div class="weather-forecast-icon"> 
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" alt="" width="44"> 
            </div>  
            <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">32 &#8451</span> 
            <span class="weather-forecast-temperature-min">19 &#8451</span>  
            </div>
          </div>
`;
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchEngine);
searchCity();
displayForecast();
