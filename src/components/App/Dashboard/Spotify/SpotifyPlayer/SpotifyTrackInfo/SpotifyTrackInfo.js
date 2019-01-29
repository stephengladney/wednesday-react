import React from "react";
import "./SpotifyTrackInfo.css";

const SpotifyTrackInfo = ({ header, text, icon }) => {
  if (icon) {
    icon = <i className={`${icon} icon inverted link big`} />;
  } else {
    icon = "";
  }
  return (
    <div className="spotifyTrackInfo">
      <div className="spotifyTrackInfoHeader">{header}</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="spotifyTrackInfoText">{text}</div>
        {icon}
      </div>
    </div>
  );
};

export default SpotifyTrackInfo;
