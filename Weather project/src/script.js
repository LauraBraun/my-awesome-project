// Current time and date

function updateDateTime () {
 let day = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`
];

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
let today= day[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}

let dayofweek = document.querySelector("#currentDay");
let time = document.querySelector("#currentTime");
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${date} ${monthDate}`;
dayofweek.innerHTML = `${today}`;
time.innerHTML = `${hours}:${minutes}`;
}

let now = new Date();
updateDateTime(now);


// Change temperature unit

function changeUnit () {
  if (unit.innerHTML === "°C") {
  let temp = document.querySelector(".currentTemp");
  let fahrenheitTemp =Math.round(((temp * 9) /5)+ 32);
  temp.innerHTML = `${fahrenheitTemp}`;
  unit.innerHTML = "°F";
  } else {
    let temp = document.querySelector(".currentTemp");
    let celsiusTemp = Math.round(((temp - 32) * 5) / 9);
    temp.innerHTML = `${celsiusTemp}`; 
    unit.innerHTML = `°C`;
  }
}

let unit = document.querySelector("#degreeConversion");
unit.addEventListener("click", changeUnit);

//Search engine

function showWeather (response) {

let input = response.data.name;
let country = response.data.sys.country;
let output = document.querySelector ("#displayCity");
output.innerHTML = `${input}, ${country}`;

let temp =  document.querySelector(".currentTemp");
let nowTemp = Math.round(response.data.main.temp);
temp.innerHTML = `${nowTemp}`;

let humidity = document.querySelector("#humidity");
let nowHumidity = response.data.main.humidity;
humidity.innerHTML = `Humidity: ${nowHumidity} %`;

let windSpeed = document.querySelector("#windspeed");
let nowWindspeed = response.data.wind.speed;
windSpeed.innerHTML = `Wind: ${nowWindspeed} m/s`;

//let precipitation = document.querySelector("#precipitation");
//let nowPrecipitation = response.data.rain["1h"];
//if (nowPrecipitation === undefined) {
  //precipitation.innerHTML = `Precipitation: 0 mm`;
//} else {
  //precipitation.innerHTML = `Precipitation: ${nowPrecipitation}mm`;
//}

}

function searchCity (city) {
let apiKey = "2312e7899c189d46fb63d2d7ce28c492";
let apiBeginUrl = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let apiUrl = `${apiBeginUrl}q=${city}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);

axios.get(apiUrl).then(showWeather);
}
function handleEvent (event) {
event.preventDefault();
let city = document.querySelector("#search-city").value;
searchCity(city);
}

 function getPosition(position) {
  
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "2312e7899c189d46fb63d2d7ce28c492";
    let units = "metric";
    let apiBeginUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiBeginUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
  }

function searchCoordinates () {
  navigator.geolocation.getCurrentPosition(getPosition);
}

city = document.querySelector ("#citysearch");
city.addEventListener("submit", handleEvent);

let coordinates = document.querySelector("#coordinates");
coordinates.addEventListener("click",searchCoordinates);

searchCity("amsterdam");