import { DateTime } from "luxon";
import { Table } from "./table.js";

let inputEl = document.querySelectorAll("input");
console.log(inputEl);
inputEl.forEach((node) => (node.onchange = printCurrentWeather));

function printCurrentWeather(event) {
  const OPEN_WEATHER_MAP_API =
    `https://api.openweathermap.org/data/2.5/weather?q=${event.srcElement.value}` +
    `&appid=41b5f2dff98d93a61b92c9605018bb4d&units=metric&lang=ro`;
  fetch(OPEN_WEATHER_MAP_API)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      printWeatherFor7Days(data.coord);
    });
}

function printWeatherFor7Days({ lat, lon }) {
  const OPEN_WEATHER_MAP_API =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}` +
    `&appid=41b5f2dff98d93a61b92c9605018bb4d&units=metric&lang=ro`;
  fetch(OPEN_WEATHER_MAP_API)
    .then((response) => response.json())
    .then((data) => {
      const table = new Table([
        "Data",
        "Temp max",
        "Temp min",
        "Viteza vantului",
      ]);
      console.log(table);

      console.log(data);

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
