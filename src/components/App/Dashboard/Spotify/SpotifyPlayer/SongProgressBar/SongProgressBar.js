import React from "react";
import "./SongProgressBar.css";
import { secondsToMinutes } from "../../../../../../wednesday";

const songProgressBar = ({ currentMilliseconds, totalMillieconds }) => {
  return (
    <div className="songProgressBar">
      <h2 className="timeStamp">
        {secondsToMinutes(Math.ceil(currentMilliseconds / 1000))}
      </h2>

      <div
        style={{
          width: "75%",
          backgroundColor: "#555555"
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.floor(
              Number(currentMilliseconds / totalMillieconds) * 100
            )}%`,
            backgroundColor: "#ff5e54"
          }}
        >
          {"\xa0"}
        </div>
      </div>
      <h2 className="timeStamp">
        {secondsToMinutes(Math.floor(totalMillieconds / 1000))}
      </h2>
    </div>
  );
};

export default songProgressBar;
