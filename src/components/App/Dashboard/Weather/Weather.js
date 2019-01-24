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
  militarizeTime,
  abbreviateTime
} from "../../../../wednesday";
import WeatherSummaryDetail from "./WeatherSummaryDetail/WeatherSummaryDetail";
import axios from "axios";

var todayForecast = [];
var fiveDayForecast = [];

class Weather extends Component {
  constructor(props) {
    super(props);
    this.weatherRefresher = setInterval(this.updateWeather(), 1800000);
    this.state = {
      current: {
        summary: 0,
        icon: 0,
        temperature: 0,
        cloudCover: 0,
        humidity: 0,
        windSpeed: 0,
        high: 0,
        low: 0,
        sunrise: 0,
        sunset: 0
      },
      hourly: [],
      daily: []
    };
  }
  updateWeather() {
    weatherService()
      .then(weather => {
        const sunrise = weather.daily.data[0].sunriseTime;
        const sunset = weather.daily.data[0].sunsetTime;
        this.setState({
          current: {
            summary: String(weather.currently.summary).toLowerCase(),
            icon: weather.currently.icon,
            temperature: Number(weather.currently.temperature).toFixed(),
            cloudCover: Number(weather.currently.cloudCover * 100).toFixed(),
            humidity: Number(weather.currently.humidity * 100).toFixed(),
            windSpeed: weather.currently.windSpeed,
            temperatureHigh: Number(
              weather.daily.data[0].temperatureHigh
            ).toFixed(),
            temperatureLow: Number(
              weather.daily.data[0].temperatureLow
            ).toFixed(),
            sunrise:
              this.props.timeFormat === "standard"
                ? standardizeTime(sunrise)
                : militarizeTime(sunrise),
            sunset:
              this.props.timeFormat === "standard"
                ? standardizeTime(sunset)
                : militarizeTime(sunset)
          },
          hourly: weather.hourly.data,
          daily: weather.daily.data
        });
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
    switch (this.state.current.summary) {
      case 0:
        todayForecast = [];
        break;
      default:
        todayForecast = [];
        for (let i = 1; i <= 8; i++) {
          var hour = this.state.hourly[i];
          todayForecast.push(
            <FutureHour
              hour={abbreviateTime(standardizeTime(hour.time))}
              temperature={Number(hour.temperature).toFixed()}
              key={`hour${i}`}
            />
          );
        }
        const dayPreference = "long";
        fiveDayForecast = nextFiveWeekdays().map(day => (
          <FutureDay
            day={dayPreference === "short" ? abbreviateWeekday(day) : day}
            high="68"
            low="57"
          />
        ));
    }

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
              className="ui button inverted secondary"
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
            <span className="helper" />
            {/* <img
              className="weatherIconBig"
              src={`/images/weather_icons/${this.state.current.icon}`}
              alt="weather icon"
            />{" "} */}
            <div className="weatherTemperature">
              {this.state.current.temperature}{" "}
              {this.props.units === "imperial" ? "°F" : "°C"}
            </div>
            <div className="weatherSummary">
              <table className="weatherSummary">
                <tbody>
                  <tr>
                    <td>
                      <WeatherSummaryDetail
                        detailName="Conditions"
                        detailValue={this.state.current.summary}
                      />
                      <WeatherSummaryDetail
                        detailName="Cloud Coverage"
                        detailValue={this.state.current.cloudCover + "%"}
                      />
                      <WeatherSummaryDetail
                        detailName="Humidity"
                        detailValue={this.state.current.humidity + "%"}
                      />
                      <WeatherSummaryDetail
                        detailName="Wind"
                        detailValue={
                          Number(this.state.current.windSpeed).toFixed() +
                          " mph"
                        }
                      />
                    </td>
                    <td>
                      <WeatherSummaryDetail
                        detailName="High"
                        detailValue={this.state.current.temperatureHigh}
                      />
                      <WeatherSummaryDetail
                        detailName="Low"
                        detailValue={this.state.current.temperatureLow}
                      />
                      <WeatherSummaryDetail
                        detailName="Sunrise"
                        detailValue={this.state.current.sunrise}
                      />
                      <WeatherSummaryDetail
                        detailName="Sunset"
                        detailValue={this.state.current.sunset}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="content">
          <h2 className="subtitle">Today</h2>
          <div className="weatherFiveDayForecast">{todayForecast}</div>
        </div>
        <div className="content">
          <h2 className="subtitle">5-Day Forecast</h2>
          <div className="weatherFiveDayForecast">{fiveDayForecast}</div>
        </div>
      </div>
    );
  }
}

export default Weather;
