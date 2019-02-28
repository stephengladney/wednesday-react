import React, { Component } from "react";
import axios from "axios";
import "./SpotifyPlayer.css";
import SongProgressBar from "./SongProgressBar/SongProgressBar";
// import {
//   spotifyPlayerCommand,
//   spotifyCurrentlyPlaying
// } from "../../../../../wednesday";
import SpotifyTrackInfo from "./SpotifyTrackInfo/SpotifyTrackInfo";
import Loading from "../../Loading";

var timeMarker;

class SpotifyPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
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
          <Loading />
        </div>
      );
    }

    var playOrPauseCurrentButton =
      this.state.isPlaying === true ? "pause" : "play";
    var shuffleButtonColor =
      this.state.shuffleEnabled === true ? { color: "#ff5e54" } : {};
    var saveButton =
      this.state.isSongInLibrary === true
        ? "check green"
        : "plus square outline grey";
    return (
      <div>
        <h2 className="subtitle">Currently Listening To</h2>
        <div className="spotifyCurrentTrack">
          <div>
            <img src={this.state.albumArtUrl} className="spotifyAlbumArtwork" />
          </div>
          <div>
            <SpotifyTrackInfo header="Artist" text={this.state.artist} />
            <SpotifyTrackInfo
              header="Song"
              text={this.state.song}
              icon={saveButton}
            />
            <SpotifyTrackInfo header="Album" text={this.state.album} />
          </div>
        </div>
        <div className="spotifyControls">
          <i className="step backward icon link huge" onClick={this.previous} />
          <i
            className={`${playOrPauseCurrentButton} icon link huge`}
            onClick={() => this.playOrPause(playOrPauseCurrentButton)}
          />
          <i className="step forward icon link huge" onClick={this.next} />
          <i
            className={`random icon link huge`}
            style={shuffleButtonColor}
            onClick={this.shuffle}
          />
        </div>
        <SongProgressBar
          currentMilliseconds={this.state.progress}
          totalMillieconds={this.state.songDuration}
        />
      </div>
    );
  }
}

export default SpotifyPlayer;
