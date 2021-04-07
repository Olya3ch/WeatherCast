import axios from "axios";
import { OPEN_WEATHER__MAP_API_KEY } from './credentials.js';
const argv = process.argv
const city = argv[2]
async function printCurrentWeather(cityName) {
    const OPEN_WEATHER__MAP_API = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPEN_WEATHER__MAP_API_KEY}&units=metric&lang=ro`;
    try {
        const response = await axios.get(OPEN_WEATHER__MAP_API)
        let cast = response.data;
        console.log(`În ${cast.name} se prognozează ${cast.weather[0].description}.` +
            `\nTemperatura curentă este de ${Math.round(cast.main.temp)}°C.`);

    } catch (error) {
        console.log(error)
    }


}


printCurrentWeather(city);
