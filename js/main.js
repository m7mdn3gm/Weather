// ====== Show And Hide Nav-Bar ======
const iconList = document.querySelector('.fa-bars');
iconList.addEventListener('click' , ()=>{
    document.querySelector('nav ul').classList.toggle('show')
});

// ====== start Project ======
const findCity = document.getElementById("find-search");
const today = document.getElementById("today");
const todayData = document.getElementById("today-date");
const cityLocation = document.getElementById("location");
const todayDegree = document.getElementById("today-degree");
const todayIcon = document.getElementById("today-icon");
const description = document.getElementById("today-description");
const humidty = document.getElementById("humidty");
const wind = document.getElementById("wind");
const compass = document.getElementById("compass");

const nextDay = document.getElementsByClassName("nextDay");
const nextDayIcon = document.getElementsByClassName("nextDay-icon");
const maxDegree = document.getElementsByClassName("max-degree");
const minDegree = document.getElementsByClassName("min-degree");
const nextDayDescription = document.getElementsByClassName("nextDay-description");

let searchedCity = "cairo";
let apiResponse;
let responseData;
let monthName = ["Jan","Feb","March","April","May","June","July","Aug","Spet","Oct","Nov","Dec"];
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// ====== Search ======
findCity.addEventListener("keyup" , ()=>{
    searchedCity = findCity.value;
    getWeatherData();
})

// ====== Get Wheather Data ======
async function getWeatherData() {
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8dbc624780734895993162306232602&q=${searchedCity}&days=3`);
    responseData = await apiResponse.json();
    // console.log(responseData);
    displayTodayWeather();
    displayNextDayWeather();
}
getWeatherData();

// ====== Display Today Weather ======
function displayTodayWeather() {
    var date = new Date();
    today.innerHTML = days[date.getDay()]
    todayData.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = responseData.current.temp_c;
    todayIcon.setAttribute("src" , `https:${responseData.current.condition.icon}`);
    description.innerHTML = responseData.current.condition.text;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML = responseData.current.wind_dir;
}

// ====== Display Next Day Weather ======
function displayNextDayWeather() {
    for (var i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i + 1].day.condition.icon}`);
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i + 1].day.condition.text;
      }
    
}
