import React from "react";
import "./WeatherSummaryDetail.css";

const WeatherSummaryDetail = ({ detailName, detailValue }) => {
  return (
    <span>
      <span className="weatherSummaryDetailLabel">{detailName}:</span>{" "}
      <span className="weatherSummaryDetailValue">{detailValue}</span>
      <br />
    </span>
  );
};

export default WeatherSummaryDetail;
