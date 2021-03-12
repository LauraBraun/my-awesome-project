function updateDateTime (timestamp) {
 let now = new Date(timestamp);
  let month = [
    `January`,
    `Febuary`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];

let monthDate = month[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}
return `${date} ${monthDate} ${hours}:${minutes}`;
}

function getDay(timestamp) {
 let now = new Date(timestamp);
  let day = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`
];

let today= day[now.getDay()];
return `${today}`;
}

function changeUnit () {
  if (unit.innerHTML === "°C") {
  let temp = document.querySelector(".currentTemp");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  temp.innerHTML = `${fahrenheitTemp}`;
  unit.innerHTML = "°F";
  } else {
    let temp = document.querySelector(".currentTemp");
    celsiusTemp= Math.round(celsiusTemp);
    temp.innerHTML = `${celsiusTemp}`; 
    unit.innerHTML = `°C`;
  }
}

function showWeather (response) {
let input = response.data.name;
let country = response.data.sys.country;
let output = document.querySelector ("#displayCity");
output.innerHTML = `${input}, ${country}`;

let temp =  document.querySelector(".currentTemp");
celsiusTemp = response.data.main.temp;
let nowTemp = Math.round(celsiusTemp);
temp.innerHTML = `${nowTemp}`;

let description = document.querySelector("#weatherDescription");
description.innerHTML = `${response.data.weather[0].description}`;

let humidity = document.querySelector("#humidity");
let nowHumidity = response.data.main.humidity;
humidity.innerHTML = `Humidity: ${nowHumidity} %`;

let windSpeed = document.querySelector("#windspeed");
let nowWindspeed = Math.round(response.data.wind.speed);
windSpeed.innerHTML = `Wind: ${nowWindspeed} m/s`;

let iconElement = document.querySelector("#currentConditions");
iconElement.setAttribute("src",  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

let dateElement = document.querySelector("#currentDate");
dateElement.innerHTML = updateDateTime(response.data.dt * 1000);
let dayofweek = document.querySelector("#currentDay");
dayofweek.innerHTML = getDay(response.data.dt * 1000);
}

function getForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

for (let index = 0; index < 6; index ++) {
 let forecast = response.data.daily[index];
  forecastElement.innerHTML += `
          <div class="col-2">
            ${getDay(forecast.dt * 1000)}
            <br />
            <div>
              <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
            </div>
           <strong>${Math.round(forecast.temp.max)}°C </strong>/ ${Math.round(forecast.temp.min)}°C
          </div>`;
}

let precipitation = document.querySelector("#precipitation");
precipitation.innerHTML = `Precipitation: ${Math.round(response.data.daily[0].pop * 100)} %`;
}

function getGeolocation(position) {
  let lat = position.data[0].lat
  let long = position.data[0].lon
  let apiKey = "2312e7899c189d46fb63d2d7ce28c492";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);
}

function searchCity (city) {
let apiKey = "2312e7899c189d46fb63d2d7ce28c492";
let apiBeginUrl = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let apiUrl = `${apiBeginUrl}q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showWeather);

apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${apiKey}`;
axios.get(apiUrl).then(getGeolocation); 
}

function handleEvent (event) {
event.preventDefault();
let city = document.querySelector("#search-city").value;
searchCity(city);
}

function getPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "2312e7899c189d46fb63d2d7ce28c492";
    let units = "metric";
    let apiBeginUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiBeginUrl}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;


  axios.get(apiUrl).then(showWeather); 

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);
  }

function searchCoordinates () {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let celsiusTemp = null;

let unit = document.querySelector("#degreeConversion");
unit.addEventListener("click", changeUnit);

city = document.querySelector ("#citysearch");
city.addEventListener("submit", handleEvent);

let coordinates = document.querySelector("#coordinates");
coordinates.addEventListener("click",searchCoordinates);

searchCity("amsterdam");