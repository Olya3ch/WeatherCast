

import { printCurrentWeather, printWeatherFor7Days } from "./WeatherAPI.js";
const city = process.argv[2];

const coords = await printCurrentWeather(city);
printWeatherFor7Days(coords)
