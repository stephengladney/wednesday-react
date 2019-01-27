import React from "react";
import "./SpotifyTrackInfo.css";

const SpotifyTrackInfo = ({ header, text }) => {
  return (
    <div className="spotifyTrackInfo">
      <div className="spotifyTrackInfoHeader">{header}</div>
      <div className="spotifyTrackInfoText">{text}</div>
    </div>
  );
};

export default SpotifyTrackInfo;
