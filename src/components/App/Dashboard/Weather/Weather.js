import React from "react";
import "./Weather.css";

const Weather = ({
  longitude,
  latitude,
  weather_icon,
  weather_description,
  weather_units,
  weather_temperature,
  weather_city,
  weather_high,
  weather_low,
  weather_humidity,
  weather_wind,
  weather_sunrise,
  weather_sunset,
  weather_clouds
}) => {
  if (weather_icon === "spinner" || weather_icon === "unavailable") {
    return (
      <div>
        <h1 className="title">Weather</h1>
        <h2 className="subtitle">Current Conditions</h2>
        <div className="content">
          <i
            className={`${
              weather_icon === "spinner"
                ? "spinner loading"
                : "exclamation triangle"
            } icon huge`}
          />{" "}
          {weather_description}
        </div>
      </div>
    );
  } else {
    weather_sunrise = new Date(Number(weather_sunrise) * 1000);
    weather_sunset = new Date(Number(weather_sunset) * 1000);
    weather_sunrise = String(
      `${weather_sunrise.getHours()}:${weather_sunrise.getMinutes()} ${
        weather_sunrise.getHours() < 12 ? "AM" : "PM"
      }`
    );
    weather_sunset = String(
      `${
        weather_sunset.getHours() < 12
          ? weather_sunset.getHours()
          : weather_sunset.getHours() - 12
      }:${weather_sunset.getMinutes()} ${
        weather_sunset.getHours() < 12 ? "AM" : "PM"
      }`
    );

    return (
      <div>
        <h1 className="title">Weather</h1>
        <h2 className="subtitle">Current Conditions</h2>
        <div className="content">
          <span class="helper" />
          <img
            className="weatherIcon"
            src={`/images/weather_icons/${weather_icon}`}
            alt="weather icon"
          />{" "}
          <div className="weatherTemperature">
            {weather_temperature}
            {weather_units === "imperial" ? "°F" : "°C"}
          </div>
          {/* <div className="weatherSummary"> */}
          <table className="weatherSummary">
            <tr>
              <td>
                <span className="weatherSummaryDetail">Conditions:</span>{" "}
                {weather_description}
                <br />
                <span className="weatherSummaryDetail">Clouds:</span>{" "}
                {weather_clouds}%
                <br />
                <span className="weatherSummaryDetail">Humidity:</span>{" "}
                {weather_humidity}%
                <br />
                <span className="weatherSummaryDetail">Wind:</span>{" "}
                {Number(weather_wind).toFixed()} mph
                <br />
              </td>
              <td>
                <span className="weatherSummaryDetail">High:</span>{" "}
                {weather_high}
                <br />
                <span className="weatherSummaryDetail">Low:</span> {weather_low}
                <br />
                <span className="weatherSummaryDetail">Sunrise:</span>{" "}
                {weather_sunrise}
                <br />
                <span className="weatherSummaryDetail">Sunset:</span>{" "}
                {weather_sunset}
                <br />
              </td>
            </tr>
          </table>
        </div>
      </div>
      // </div>
    );
  }
};

export default Weather;
