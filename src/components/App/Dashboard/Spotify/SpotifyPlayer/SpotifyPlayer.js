import React from "react";
import "./SpotifyPlayer.css";
import {
  spotifyPlayerCommand,
  spotifyCurrentlyPlaying
} from "../../../../../wednesday";
import spotifyTrackInfo from "./SpotifyTrackInfo/SpotifyTrackInfo";
import SpotifyTrackInfo from "./SpotifyTrackInfo/SpotifyTrackInfo";

const SpotifyPlayer = ({
  artist,
  song,
  album,
  albumArtUrl,
  isPlaying,
  isLocal,
  shuffle,
  shuffleEnabled,
  next,
  previous,
  playOrPause
}) => {
  isLocal = true;
  var playOrPauseCurrentButton = isPlaying === true ? "pause" : "play";
  var shuffleButtonColor = shuffleEnabled === true ? { color: "#ff5e54" } : {};
  var saveButton =
    isLocal === true ? "check green" : "plus square outline grey";
  return (
    <div>
      <div className="spotifyCurrentTrack">
        <div>
          <img src={albumArtUrl} className="spotifyAlbumArtwork" />
        </div>
        <div>
          <SpotifyTrackInfo header="Artist" text={artist} />
          <SpotifyTrackInfo header="Song" text={song} icon={saveButton} />
          <SpotifyTrackInfo header="Album" text={album} />
        </div>
      </div>
      <div className="spotifyControls">
        <i className="step backward icon link massive" onClick={previous} />
        <i
          className={`${playOrPauseCurrentButton} icon link massive`}
          onClick={() => playOrPause(playOrPauseCurrentButton)}
        />
        <i className="step forward icon link massive" onClick={next} />
        <i
          className={`random icon link massive`}
          style={shuffleButtonColor}
          onClick={shuffle}
        />
      </div>
    </div>
  );
};

export default SpotifyPlayer;
