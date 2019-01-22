import React, { Component } from "react";
import "./Weather.css";
import FutureDay from "./FutureDay/FutureDay";
import FutureHour from "./FutureHour/FutureHour";
import {
  nextFiveWeekdays,
  abbreviateWeekday,
  myLocation,
  getWeatherByLocation,
  weatherService
} from "../../../../wednesday";
import WeatherSummaryDetail from "./WeatherSummaryDetail/WeatherSummaryDetail";
import axios from "axios";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.weatherRefresher = setInterval(this.updateWeather(), 1800000);
    this.state = {};
  }
  updateWeather() {
    weatherService()
      .then(weather => this.setState(weather))
      .catch(e => console.log(e));
  }
  componentDidMount() {
    this.updateWeather();
  }

  componentWillUnmount() {
    clearInterval(this.weatherRefresher);
  }

  render() {
    return `${this.state.latitude}`;
  }
}
// if (weather_icon === "spinner") {
//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "flex-end"
//         }}
//       >
//         <h1 className="title">Weather</h1>
//         <div style={{ paddingRight: "20px" }}>
//           <button
//             class="ui button inverted secondary"
//             onClick={updateLocationBasedInformation}
//           >
//             Refresh Weather Data
//           </button>
//           <div className="darkSkyWatermark">
//             Powered by <a href="https://darksky.net/poweredby/">Dark Sky</a>
//           </div>
//         </div>
//       </div>
//       <div class="ui segment">
//         <div class="ui active dimmer">
//           <div class="ui huge text loader">Loading</div>
//         </div>
//         <p />
//       </div>
//     </div>
//   );
// } else if (weather_icon === "unavailable") {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "flex-start"
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "flex-end"
//         }}
//       >
//         <h1 className="title">Weather</h1>
//         <div style={{ paddingRight: "20px" }}>
//           <button
//             class="ui button inverted secondary"
//             onClick={updateLocationBasedInformation}
//           >
//             Refresh Weather Data
//           </button>
//           <div className="darkSkyWatermark">
//             Powered by <a href="https://darksky.net/poweredby/">Dark Sky</a>
//           </div>
//         </div>
//       </div>
//       <div className="content" style={{ textAlign: "center" }}>
//         <h1>
//           <br />
//           <br />
//           <br />
//           <br />
//         </h1>
//         <i
//           className="exclamation triangle icon huge"
//           style={{ marginBottom: "20px" }}
//         />
//         <br />
//         Could not load weather data.
//       </div>
//     </div>
//   );
// } else {
// weather_sunrise = new Date(Number(weather_sunrise) * 1000);
// weather_sunset = new Date(Number(weather_sunset) * 1000);
// weather_sunrise = String(
//   `${weather_sunrise.getHours()}:${weather_sunrise.getMinutes()} ${
//     weather_sunrise.getHours() < 12 ? "AM" : "PM"
//   }`
// );
// weather_sunset = String(
//   `${
//     weather_sunset.getHours() < 12
//       ? weather_sunset.getHours()
//       : weather_sunset.getHours() - 12
//   }:${weather_sunset.getMinutes()} ${
//     weather_sunset.getHours() < 12 ? "AM" : "PM"
//   }`
// );
// const dayPreference = "long";
// const fiveDayForecast = nextFiveWeekdays().map(day => (
//   <FutureDay
//     day={dayPreference === "short" ? abbreviateWeekday(day) : day}
//     high="68"
//     low="57"
//   />
// ));
// const todayForecast = ["4PM", "7PM", "10PM", "1AM"].map(time => (
//   <FutureHour hour={time} temperature="64" />
// ));
// return (
//   <div>
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "flex-end"
//       }}
//     >
//       <h1 className="title">Weather</h1>
//       <div style={{ paddingRight: "20px" }}>
//         <button
//           class="ui button inverted secondary"
//           onClick={updateLocationBasedInformation}
//         >
//           Refresh Weather Data
//         </button>
//         <div className="darkSkyWatermark">
//           Powered by <a href="https://darksky.net/poweredby/">Dark Sky</a>
//         </div>
//       </div>
//     </div>
//     <div className="content">
//       <h2 className="subtitle">Current Conditions</h2>
//       <div className="weatherCurrentConditions">
//         <span class="helper" />
//         <img
//           className="weatherIconBig"
//           src={`/images/weather_icons/${weather_icon}`}
//           alt="weather icon"
//         />{" "}
//         <div className="weatherTemperature">
//           {weather_temperature} {weather_units === "imperial" ? "°F" : "°C"}
//         </div>
//         {/* <div className="weatherSummary"> */}
//         <table className="weatherSummary">
//           <tr>
//             <td>
//               <WeatherSummaryDetail
//                 detailName="Conditions"
//                 detailValue={weather_description}
//               />
//               <WeatherSummaryDetail
//                 detailName="Cloud Coverage"
//                 detailValue={weather_clouds + "%"}
//               />
//               <WeatherSummaryDetail
//                 detailName="Humidity"
//                 detailValue={weather_humidity + "%"}
//               />
//               <WeatherSummaryDetail
//                 detailName="Wind"
//                 detailValue={Number(weather_wind).toFixed() + " mph"}
//               />
//             </td>
//             <td>
//               <WeatherSummaryDetail
//                 detailName="High"
//                 detailValue={weather_high}
//               />
//               <WeatherSummaryDetail
//                 detailName="Low"
//                 detailValue={weather_low}
//               />
//               <WeatherSummaryDetail
//                 detailName="Sunrise"
//                 detailValue={weather_sunrise}
//               />
//               <WeatherSummaryDetail
//                 detailName="Sunset"
//                 detailValue={weather_sunset}
//               />
//             </td>
//           </tr>
//         </table>
//       </div>
//     </div>
//     <div className="content">
//       <h2 className="subtitle">Today</h2>
//       <div className="weatherFiveDayForecast">{todayForecast}</div>
//     </div>
//     <div className="content">
//       <h2 className="subtitle">5-Day Forecast</h2>
//       <div className="weatherFiveDayForecast">{fiveDayForecast}</div>
//     </div>
//   </div>
//   // </div>
// );
// };
export default Weather;
