import axios from "axios";
import { OPEN_WEATHER__MAP_API_KEY } from "./credentials.js";
import Table from "cli-table3";
import { DateTime } from "luxon";

async function getData(url) {
  try {
    const response = await axios.get(url);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function printCurrentWeather(cityName) {
  const OPEN_WEATHER__MAP_API =
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}` +
    `&appid=${OPEN_WEATHER__MAP_API_KEY}&units=metric&lang=ro`;

  const data = await getData(OPEN_WEATHER__MAP_API);

  console.log(
    `În ${data.name} se prognozează ${data.weather[0].description}.` +
      `\nTemperatura curentă este de ${Math.round(data.main.temp)}°C.` +
      `\nLong: ${data.coord.lon} Lat: ${data.coord.lat}`
  );
  return data.coord;
}

function makeForecastTable(data) {
  const table = new Table({
    head: ["Data", "Temp maximă", "Temp minimă", "Viteza vantului"],
  });

  const dailyData = data.daily;

  dailyData.forEach((dayData) => {
    const date = DateTime.fromSeconds(dayData.dt)
      .setLocale("ro")
      .toLocaleString(DateTime.DATE_MED);

    const arr = [
      date,
      `${Math.round(dayData.temp.max)}°C`,
      `${Math.round(dayData.temp.min)}°C`,
      `${Math.round(dayData.wind_speed)} m/s`,
    ];
    table.push(arr);
  });
  return table;
}

export async function printWeatherFor7Days({ lat, lon }) {
  const OPEN_WEATHER__MAP_API =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}` +
    `&appid=${OPEN_WEATHER__MAP_API_KEY}&units=metric&lang=ro`;

  const data = await getData(OPEN_WEATHER__MAP_API);

  console.log(makeForecastTable(data).toString());
}
