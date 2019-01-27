import React, { Component } from "react";
import {
  spotifyPlayerCommand,
  spotifyCurrentlyPlaying
} from "../../../../wednesday";
import SpotifyPlayer from "./SpotifyPlayer/SpotifyPlayer";

class Spotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumArtUrl: ""
    };
    this.playPauseButton = this.playPauseButton.bind(this);
  }
  componentDidMount() {
    this.updateSpotifyState();
  }

  updateSpotifyState() {
    spotifyCurrentlyPlaying().then(track => {
      this.setState({
        albumArtUrl: track.data.item.album.images[0].url,
        artist: track.data.item.artists[0].name,
        song: track.data.item.name,
        album: track.data.item.album.name,
        isPlaying: track.data.is_playing
      });
    });
  }

  playPauseButton(func) {
    spotifyPlayerCommand(func).then(response => {
      if (response.status === 204) {
        this.setState({ isPlaying: !this.state.isPlaying });
      }
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">spotify</h1>
        <div className="content">
          <h2 className="subtitle">Currently Listening To</h2>
          <SpotifyPlayer
            artist={this.state.artist}
            song={this.state.song}
            album={this.state.album}
            albumArtUrl={this.state.albumArtUrl}
            isPlaying={this.state.isPlaying}
            playPauseButton={this.playPauseButton}
          />
        </div>
      </div>
    );
  }
}

export default Spotify;
