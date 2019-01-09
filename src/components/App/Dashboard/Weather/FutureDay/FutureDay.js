import React from "react";
import "./FutureDay.css";

const FutureDay = ({ day, high, low }) => {
  return (
    <div className="weatherFutureDay">
      <h1 className="weatherFutureDayHeader">{day}</h1>
      <img
        className="weatherIconSmall"
        src={`/images/weather_icons/sun.png`}
        alt="weather icon"
      />
      <div className="HiLo">
        <span>
          <span className="HiLoLabel">HI: </span>{" "}
          <span className="HiLoValue">{high}</span>
        </span>
        <span>
          <span className="HiLoLabel">LO: </span>{" "}
          <span className="HiLoValue">{low}</span>
        </span>
      </div>
    </div>
  );
};

export default FutureDay;
