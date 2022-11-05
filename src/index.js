function formatDate(timestamp){
    let date = new Date(timestamp*1000);
    let hours = ('0'+ date.getHours()).slice(-2);
    let min = ('0'+ date.getMinutes()).slice(-2);
    let day = date.getDay();
    let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${days[day]}, ${hours}:${min}`
}


function getTemp(response){
   
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(response.data.main.temp);

    celsiusTemp = response.data.main.temp;

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name; 

    let weatherDescription = document.querySelector("#description-weather");
    weatherDescription.innerHTML = response.data.weather[0].main;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt);
    
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function handleSubmit(event){
    event.preventDefault();
    let cityElement = document.querySelector("#city-input"); 
    search(cityElement.value);
}

function search(city){
    let apiKey ="a1a0828d38141e5a08d007a5f3e0419f";
    let cityName = city;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(getTemp);
}

function showFarenheightTemp(event){
    event.preventDefault();
    Farenheight_value = (celsiusTemp*9)/5+32;
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(Farenheight_value);
    //remove active class from celsius link
    celsiusLink.classList.remove("active");
    //add active class from farenheight link
    farenheitLink.classList.add("active");

}


function showCelsiusTemp(event){
    event.preventDefault();
    if (Farenheight_value != null){
        celsiusTemp = (Farenheight_value - 32)*5/9;
        let tempElement = document.querySelector("#temperature");
        tempElement.innerHTML = Math.round(celsiusTemp);
        //add active class from celsius link
        celsiusLink.classList.add("active");
        //remove active class from farenheight link
        farenheitLink.classList.remove("active");
    }
}

let celsiusTemp = null;
let Farenheight_value = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit_link");
farenheitLink.addEventListener("click", showFarenheightTemp);


let celsiusLink = document.querySelector("#celsius_link");
celsiusLink.addEventListener("click", showCelsiusTemp);



search("London");
