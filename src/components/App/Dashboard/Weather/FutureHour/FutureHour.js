import React from "react";
import "./FutureHour.css";

const FutureHour = ({ hour, temperature }) => {
  return (
    <div className="weatherFutureHour">
      <h1 className="weatherFutureHourHeader">{hour}</h1>
      <img
        className="weatherIconBig"
        src={`/images/weather_icons/sun.png`}
        alt="weather icon"
      />
      <div className="weatherFutureHourTemperature">{temperature}°F</div>
    </div>
  );
};

export default FutureHour;
