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
  playPauseButton
}) => {
  var playButton = isPlaying === true ? "pause" : "play";
  return (
    <div>
      <div className="spotifyCurrentTrack">
        <div>
          <img src={albumArtUrl} className="spotifyAlbumArtwork" />
        </div>
        <div>
          <SpotifyTrackInfo header="Artist" text={artist} />
          <SpotifyTrackInfo header="Song" text={song} />
          <SpotifyTrackInfo header="Album" text={album} />
        </div>
      </div>
      <div className="spotifyControls">
        <i
          className="step backward icon inverted link massive"
          onClick={() => spotifyPlayerCommand("pause")}
        />
        <i
          className={`${playButton} icon link massive`}
          onClick={() => playPauseButton(playButton)}
        />
        <i
          className="step forward icon inverted link massive"
          onClick={() => spotifyPlayerCommand("pause")}
        />
      </div>
    </div>
  );
};

export default SpotifyPlayer;
