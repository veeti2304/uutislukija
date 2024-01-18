var weatherCodes = {
    0: "Selkeää",
    1: "Enimmäkseen selkeää",
    2: "Puoli pilvistä",
    3: "Pilvistä",
    45: "Sumua",
    48: "Sumua",
    51: "Tihkusadetta",
    53: "Tihkusadetta",
    55: "Tihkusadetta",
    56: "Jäätävää tihkusadetta",
    57: "Jäätävää tihkusadetta",
    61: "Sadetta",
    63: "Sadetta",
    65: "Sadetta",
    66: "Jäätävää sadetta",
    67: "Jäätävää sadetta",
    71: "Lumisadetta",
    73: "Lumisadetta",
    75: "Lumisadetta",
    77: "Lumisadetta",
    80: "Sadekuuroja",
    81: "Sadekuuroja",
    82: "Sadekuuroja",
    85: "Lumikuuroja",
    86: "Lumikuuroja",
    95: "Ukkosta",
    96: "Ukkosta",
    99: "Ukkosta"
};

var lat = 0;
var lon = 0;
var city = "Helsinki";

fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(data => {
    return fetch(`http://ip-api.com/json/${data.ip}`);
  })
  .then(response => response.json())
  .then(data => {
    lat = data.lat;
    lon = data.lon;
    city = data.city;

    var cityElement = document.getElementById("cityname");

    cityElement.innerHTML = city;

    var apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FMoscow`;

    return fetch(apiURL);
  })
  .then(response => response.json())
  .then(data => {
    
    var forecastElement = document.getElementById("forecast");

    var forecast = data.daily;

    var forecastHTML = "";

    for (var i = 0; i < forecast.time.length; i++) {
        var date = new Date(forecast.time[i]);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        forecast.time[i] = day + "." + month + "." + year;
        forecastHTML += `<div class="forecast-item">
        <div class="forecast-date">${forecast.time[i]}</div>
        <div class="forecast-weather">${weatherCodes[forecast.weather_code[i]]}</div>
        <div class="forecast-temperature">${forecast.temperature_2m_max[i]}°C</div>
        </div>`;
    }

    forecastElement.innerHTML = forecastHTML;

  })
  .catch(err => console.log(err));