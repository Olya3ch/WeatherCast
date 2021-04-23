import { DateTime } from "luxon";
import { Table } from "./table.js";

let inputEl = document.querySelectorAll("input");
inputEl.forEach((node) => (node.onchange = printCurrentWeather));

async function printCurrentWeather(event) {
  const OPEN_WEATHER_MAP_API =
    `https://api.openweathermap.org/data/2.5/weather?q=${event.srcElement.value}` +
    `&appid=41b5f2dff98d93a61b92c9605018bb4d&units=metric&lang=ro`;
  await fetch(OPEN_WEATHER_MAP_API)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      printWeatherFor7Days(data.coord);
    });
}

async function printWeatherFor7Days({ lat, lon }) {
  const OPEN_WEATHER_MAP_API =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}` +
    `&appid=41b5f2dff98d93a61b92c9605018bb4d&units=metric&lang=ro`;
  await fetch(OPEN_WEATHER_MAP_API)
    .then((response) => response.json())
    .then((data) => {
      const table = new Table([
        "Data",
        "Temp max",
        "Temp min",
        "Viteza vantului",
      ]);
      console.log(table);

      data.daily.forEach((day) => {
        //   console.log(day);
        const data = DateTime.fromSeconds(day.dt)
          .setLocale("ro")
          .toLocaleString(DateTime.DATE_MED);
        const tempMax = `${day.temp.max} °C`;
        const tempMin = `${day.temp.min} °C`;
        const vitezaVant = `${day.wind_speed} m/s`;
        const _day = [data, tempMax, tempMin, vitezaVant];

        table.push(_day);
      });
      console.log(table);
      const tableContainer = document.getElementById("table");
      tableContainer.innerHTML = table.genTable();
    });
}
