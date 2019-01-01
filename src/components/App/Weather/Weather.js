import React from "react";
import "./Weather.css";

const Weather = ({
  latitude,
  longitude,
  weather_icon,
  weather_description,
  weather_temperature,
  weather_units,
  weather_city
}) => {
  if (weather_icon === "spinner" || weather_icon === "unavailable") {
    return (
      <div className="Dashboard">
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
    return (
      <div className="Dashboard">
        <h1 className="title">Weather</h1>
        <h2 className="subtitle">Current Conditions</h2>
        <div className="content">
          <img
            className="weatherIcon"
            src={`/images/weather_icons/${weather_icon}`}
            alt="weather icon"
          />{" "}
          {/* <div className="weatherDescription">
            {weather_description} 
            </div> */}
          <div className="weatherTemperature">
            {weather_temperature}
            {weather_units === "imperial" ? "°F" : "°C"}
          </div>
        </div>
      </div>
    );
  }
};

export default Weather;
