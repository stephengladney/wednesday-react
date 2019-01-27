import React from "react";
import "./FutureHour.css";

const FutureHour = ({ hour, icon, temperature }) => {
  return (
    <div className="weatherFutureHour">
      <h1 className="weatherFutureHourHeader">{hour}</h1>
      <img
        className="weatherIconSmall"
        src={`/images/weather_icons/${icon}.png`}
        alt="weather icon"
      />
      <div className="weatherFutureHourTemperature">{temperature} °F</div>
    </div>
  );
};

export default FutureHour;
