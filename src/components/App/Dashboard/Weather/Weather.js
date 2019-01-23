import React, { Component } from "react";
import "./Weather.css";
import FutureDay from "./FutureDay/FutureDay";
import FutureHour from "./FutureHour/FutureHour";
import {
  nextFiveWeekdays,
  abbreviateWeekday,
  myLocation,
  getWeatherByLocation,
  weatherService,
  standardizeTime,
  militarizeTime
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
      .then(weather => {
        const sunrise = weather.daily.data[0].sunriseTime;
        const sunset =  weather.daily.data[0].sunsetTime;
        this.setState({
        current: {
          summary: weather.currently.summary,
          icon: weather.currently.icon,
          temperature: weather.currently.temperature,
          cloudCoverage: weather.currently.cloudCover,
          humidity: weather.currently.humidity,
          windSpeed: weather.currently.windSpeed,
          high: Number(weather.daily.data[0].temperatureHigh).toFixed(),
          low: Number(weather.daily.data[0].temperatureLow).toFixed(),
          sunrise: this.props.timeFormat === "standard" ? standardizeTime(sunrise) : militarizeTime(sunrise),
          sunset: this.props.timeFormat === "standard" ? standardizeTime(sunset) : militarizeTime(sunset)
        }
      })
    })
      .catch(e => console.log(e));
  }
  componentDidMount() {
    this.updateWeather();
  }

  componentWillUnmount() {
    clearInterval(this.weatherRefresher);
  }

  render() {
    
  
const dayPreference = "long";
const fiveDayForecast = nextFiveWeekdays().map(day => (
  <FutureDay
    day={dayPreference === "short" ? abbreviateWeekday(day) : day}
    high="68"
    low="57"
  />
));
const todayForecast = ["4PM", "7PM", "10PM", "1AM"].map(time => (
  <FutureHour hour={time} temperature="64" />
));
return (
  <div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
      }}
    >
      <h1 className="title">Weather</h1>
      <div style={{ paddingRight: "20px" }}>
        <button
          class="ui button inverted secondary"
          onClick={this.updateWeather}
        >
          Refresh Weather Data
        </button>
        <div className="darkSkyWatermark">
          Powered by <a href="https://darksky.net/poweredby/">Dark Sky</a>
        </div>
      </div>
    </div>
    <div className="content">
      <h2 className="subtitle">Current Conditions</h2>
      <div className="weatherCurrentConditions">
        <span class="helper" />
        <img
          className="weatherIconBig"
          src={`/images/weather_icons/${this.state.current.icon}`}
          alt="weather icon"
        />{" "}
        <div className="weatherTemperature">
          {this.state.current.temperature} {this.props.units === "imperial" ? "°F" : "°C"}
        </div>
        
//         <div className="weatherSummary"> 
//         <table className="weatherSummary">
//            <tr>
//              <td>
//                <WeatherSummaryDetail 
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
//    </div>
// );
// };
)}
}
export default Weather;
