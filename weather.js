// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi ={
    key: "44d0703fff50eb621c9c6c05b59d9337",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}
// Event listener call
const searchInputBox = document.querySelector('#inputBox');
searchInputBox.addEventListener('keypress',function(e){
    if(e.keyCode==13){
        console.log(searchInputBox.value);
        getWeatherDetail(searchInputBox.value);
    }
});

//Get Weather Detail
function getWeatherDetail(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    }).then(showWeatherReport);
}

//show Weather detail
function showWeatherReport(weather){
    console.log(weather);
    let city=document.querySelector('#city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let date=document.querySelector('#time');
    let todaydate = new Date();
    date.innerHTML =dateManage(todaydate);

    let temperature=document.querySelector('#temperature');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp=document.querySelector('#minMaxTemp');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType=document.querySelector('#weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let wind=document.querySelector('#wind');
    wind.innerHTML = `Wind Speed ${Math.round(weather.wind.speed)} m/sec`;

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage= "url('img/clear.jpg')";
    }
    else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('img/cloud.jpeg')";
    }
    else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('img/haze.jpg')";
    }
    else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('img/rain.jpg')";
    }
    else if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = "url('img/snow.jpg')";
    }
}
//today date
function dateManage(datearg){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let year = datearg.getFullYear();
    let month = months[datearg.getMonth()];
    let date = datearg.getDate();
    let day = days[datearg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}
