function getTemp(response){
    console.log(response.data)
    console.log(response.data.main.temp);

    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(response.data.main.temp);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name; 

    let weatherDescription = document.querySelector("#description-weather");
    weatherDescription.innerHTML = response.data.weather[0].main;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

    
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;


}

let apiKey ="a1a0828d38141e5a08d007a5f3e0419f";
cityName = "London";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
console.log(apiURL)



axios.get(apiURL).then(getTemp)