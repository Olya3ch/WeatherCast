import axios from "axios";
import { OPEN_WEATHER__MAP_API_KEY } from './credentials.js';

async function getData(link) {
    const response = await axios.get(link);
    return response.data;
}

export async function printCurrentWeather(cityName) {
    const OPEN_WEATHER__MAP_API = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}` +
        `&appid=${OPEN_WEATHER__MAP_API_KEY}&units=metric&lang=ro`;
    try {

        let data = await getData(OPEN_WEATHER__MAP_API);
        console.log(
            `În ${data.name} se prognozează ${data.weather[0].description}.` +
            `\nTemperatura curentă este de ${Math.round(data.main.temp)}°C.` +
            `\nLong: ${data.coord.lon} Lat: ${data.coord.lat}`
        );

        printWeatherFor7Days(data.coord.lat, data.coord.lon);

    } catch (error) {
        console.log(error)
    }
}








export async function printWeatherFor7Days(lat, lon) {
    const OPEN_WEATHER__MAP_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}` +
        `&appid=${OPEN_WEATHER__MAP_API_KEY}&units=metric&lang=ro`;
    try {
        let data = await getData(OPEN_WEATHER__MAP_API)
        console.log(data.daily.length);


    } catch (error) {
        console.log(error)
    }
}