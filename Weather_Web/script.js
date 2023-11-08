const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeather = document.getElementById('current-weather-item');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


document.addEventListener('DOMContentLoaded',() => { 
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();

    setInterval(setTime('Chennai'),60000);
    
    dateEl.innerHTML = days[day] + ',' + date + ' ' + months[month];
}
);

const searchBox = document.querySelector(".input input");
const searchBtn = document.querySelector(".input button");
const weatherIcon = document.querySelector(".weather-icon");

console.log(weatherIcon)

async function getWeatherData(city) {
    try {
        const API_KEY = '3c7321b11ee4ec7b289c92dd3a58dafe';

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        if (response.status === 404) {
            document.querySelector('.weather').style.display = 'none';
            document.querySelector('.error').style.display = 'block';
        } else {

            const timeData = await fetch(`https://api.api-ninjas.com/v1/worldtime?city=${city}`, {
                headers: {
                    'X-Api-Key': 'hdLCknVfYIRTiw++B65HwA==0RAov64CFvB4a3Fr'
                }
            });
            const timeResult = await timeData.json();


            const datetimeString = timeResult.datetime;
            const dateObject = new Date(datetimeString);
            const time = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            console.log(time);
            timeEl.innerHTML = time;


            document.querySelector('.error').style.display = 'none';
            var data = await response.json();
            console.log(data);
            console.log(data.main.humidity);
            document.querySelector("#city").innerHTML = data.name;
            document.querySelector("#pc-city").innerHTML = data.name;
            document.querySelector("#temp").innerHTML = Math.floor(data.main.temp) + "°C";
            document.getElementById('humidity').innerHTML = data.main.humidity +'%';
            document.getElementById('wind-speed').innerHTML = data.wind.speed+'kmph';
            document.getElementById('country').innerHTML = data.sys.country;

            if (data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png";
            } else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png";
            } else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain.png";
            } else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
            } else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "images/mist.png";
            }

            document.querySelector('.weather').style.display = 'block';
            document.querySelector('.card').style.maxHeight = '390px';
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

searchBtn.addEventListener('click', () => {
    getWeatherData(searchBox.value);
});


async function setTime(city) {
    const timeData = await fetch(`https://api.api-ninjas.com/v1/worldtime?city=${city}`, {
        headers: {
            'X-Api-Key': 'hdLCknVfYIRTiw++B65HwA==0RAov64CFvB4a3Fr'
        }
    });
    const timeResult = await timeData.json();


    const datetimeString = timeResult.datetime;
    const dateObject = new Date(datetimeString);
    const time = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(time);
    timeEl.innerHTML = time;
}