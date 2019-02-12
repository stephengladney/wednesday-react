import React, { Component } from "react";
import { secondsToMinutes } from "../../../../time";
import SpotifyPlayer from "./SpotifyPlayer/SpotifyPlayer";
import SongProgressBar from "./SpotifyPlayer/SongProgressBar/SongProgressBar";
import Loading from "../Loading";
import axios from "axios";

var timeMarker;

class Spotify extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.updateSpotifyState = this.updateSpotifyState.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }
  componentDidMount() {
    this.updateSpotifyState();
  }

  componentWillUnmount() {
    clearInterval(timeMarker);
  }

  playOrPause(which) {
    axios
      .get(`/api/spotify/player/${which}`)
      .then(response => {
        if (response.data === "success") {
          this.setState({ isPlaying: !this.state.isPlaying });
          if (which === "play") {
            this.progressBarOn(true);
            setTimeout(this.updateSpotifyState, 1000);
          } else {
            this.progressBarOn(false);
          }
        } else {
          alert("Error:" + response.data);
        }
      })
      .catch(error => alert(error));
  }

  shuffle() {
    axios
      .get(`/api/spotify/player/shuffle?value=${!this.state.shuffleEnabled}`)
      .then(response => {
        if (response.data === "success") {
          setTimeout(this.updateSpotifyState, 1000);
        }
      })
      .catch(error => alert(error));
  }

  previous() {
    axios.get("api/spotify/player/previous").then(response => {
      if (response.data === "success") {
        setTimeout(this.updateSpotifyState, 1000);
      }
    });
  }

  next() {
    axios.get("api/spotify/player/next").then(response => {
      if (response.data === "success") {
        setTimeout(this.updateSpotifyState, 1000);
      }
    });
  }

  progressBarOn(trueOrFalse) {
    clearInterval(timeMarker);
    if (trueOrFalse === true) {
      timeMarker = setInterval(() => {
        if (this.state.songDuration - this.state.progress < 2000) {
          clearInterval(timeMarker);
          setTimeout(this.updateSpotifyState, 1000);
        }
        this.setState({ progress: this.state.progress + 1000 });
      }, 1000);
    }
  }

  updateSpotifyState() {
    clearInterval(timeMarker);
    axios
      .get("api/spotify/player/state")
      .then(response => {
        if (response.status === 200) {
          axios
            .get(`api/spotify/player/song/isinlibrary/${response.data.item.id}`)
            .then(second_response => {
              this.setState({
                loading: false,
                albumArtUrl: response.data.item.album.images[0].url,
                artist: response.data.item.artists[0].name,
                song: response.data.item.name,
                songDuration: response.data.item.duration_ms,
                album: response.data.item.album.name,
                isPlaying: response.data.is_playing,
                isSongInLibrary: second_response.data,
                shuffleEnabled: response.data.shuffle_state,
                progress: response.data.progress_ms
              });
            })
            .catch(error => alert("Error checking library. " + error));
          if (response.data.is_playing === true) {
            this.progressBarOn(true);
          }
        } else {
          alert("500: " + response.data);
        }
      })
      .catch(error => alert(error));
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div>
          <h1 className="title">spotify</h1>
          <Loading />
        </div>
      );
    }
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
            isSongInLibrary={this.state.isSongInLibrary || false}
            shuffle={this.shuffle}
            shuffleEnabled={this.state.shuffleEnabled}
            playOrPause={this.playOrPause}
            previous={this.previous}
            next={this.next}
          />
          <SongProgressBar
            currentMilliseconds={this.state.progress}
            totalMillieconds={this.state.songDuration}
          />
        </div>
      </div>
    );
  }
}

export default Spotify;
