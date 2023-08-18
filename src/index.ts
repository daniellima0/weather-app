import { Root } from "../types";
import { format } from "date-fns";
import "./reset.css";
import "./styles.css";

const bodyElement = document.getElementsByTagName("body")[0];
bodyElement!.innerHTML = `
    <h1>Weather App</h1>
    <form>
        <input type="text" placeholder="Salvador, BA" />
        <button type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                />
            </svg>
        </button>
    </form>
    <div id="current-weather">
        <div id="current-weather__location-date">
            <h2 id="current-weather__location"></h2>
            <p id="current-weather__date"></p>
        </div>
        <img alt="Clear Sky" id="current-weather__temperature-icon" />
        <h3 id="current-weather__temperature"></h3>
        <p id="current-weather__description"></p>
    </div>
    <div id="forecast">
        <div class="forecast__item">
            <p class="forecast__item__day"></p>
            <img alt="Clear Sky" class="forecast__item__temperature-icon" />
            <p class="forecast__item__temperature"></p>
        </div>
        <div class="forecast__item">
            <p class="forecast__item__day"></p>
            <img alt="Clear Sky" class="forecast__item__temperature-icon" />
            <p class="forecast__item__temperature"></p>
        </div>
        <div class="forecast__item">
            <p class="forecast__item__day"></p>
            <img alt="Clear Sky" class="forecast__item__temperature-icon" />
            <p class="forecast__item__temperature"></p>
        </div>
    </div>
`;

const getApiUrl = (location: string) => {
    const apiBaseUrl = "http://api.weatherapi.com/v1/forecast.json";
    const apiKey = "a6c7a6406ec04d97b1c60246231708";
    const days = 3;
    const aqi = "no";
    const alerts = "no";

    return `${apiBaseUrl}?key=${apiKey}&q=${location}&days=${days}&aqi=${aqi}&alerts=${alerts}`;
};

const getWeather = async (location: string) => {
    const apiUrl = getApiUrl(location);
    const response = await fetch(apiUrl);
    const data: Root = await response.json();
    return data;
};

const getDayOfDateString = (dateString: string) => {
    const date = new Date(dateString);
    const day = format(date, "EEEE");
    return day;
};

const renderWeather = (weather: Root) => {
    // Current weather attributions
    currentWeatherElements.date!.textContent = getDayOfDateString(
        weather.location.localtime
    );
    currentWeatherElements.description!.textContent =
        weather.current.condition.text;
    currentWeatherElements.location!.textContent = weather.location.name;
    currentWeatherElements.temperature!.textContent =
        weather.current.temp_c.toString() + " °C";
    currentWeatherElements.temperatureIcon!.src =
        weather.current.condition.icon;

    // Forecast attributions
    for (let i = 0; i < forecastElements.days.length; i++) {
        forecastElements.days[i]!.textContent = getDayOfDateString(
            weather.forecast.forecastday[i]!.date
        );
        let forecastDay = weather.forecast.forecastday[i];
        if (forecastDay) {
            forecastElements.temperatures[i]!.textContent =
                forecastDay.day.avgtemp_c.toString() + " °C";
            forecastElements.temperatureIcons[i]!.src =
                forecastDay.day.condition.icon;
        }
    }
};

// Current weather elements
const currentWeatherElements = {
    location: document.getElementById("current-weather__location"),
    date: document.getElementById("current-weather__date"),
    temperatureIcon: document.getElementById(
        "current-weather__temperature-icon"
    ) as HTMLImageElement,
    temperature: document.getElementById("current-weather__temperature"),
    description: document.getElementById("current-weather__description"),
};

// Forecast elements
const forecastElements = {
    days: document.getElementsByClassName("forecast__item__day"),
    temperatureIcons: document.getElementsByClassName(
        "forecast__item__temperature-icon"
    ) as HTMLCollectionOf<HTMLImageElement>,
    temperatures: document.getElementsByClassName(
        "forecast__item__temperature"
    ),
};

// Event listeners
const inputButton = document.getElementsByTagName("input")[0];
const searchButton = document.getElementsByTagName("button")[0];

inputButton?.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        if (!inputButton?.value) return;
        getWeather(inputButton?.value).then((weather) =>
            renderWeather(weather)
        );
    }
});

searchButton?.addEventListener("click", () => {
    if (!inputButton?.value) return;
    getWeather(inputButton?.value).then((weather) => renderWeather(weather));
});

getWeather("Salvador, BA").then((weather) => renderWeather(weather));
