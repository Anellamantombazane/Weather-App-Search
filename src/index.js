function searchEngine(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#current-weather-city");
  cityElement.innerHTML = searchFormInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchEngine);
