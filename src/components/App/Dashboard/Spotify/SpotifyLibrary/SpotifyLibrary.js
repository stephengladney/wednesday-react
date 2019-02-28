import React, { Component } from "react";
import axios from "axios";

var trackList = [];

class SpotifyLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sortBy: "Artist",
      songCount: 0
    };
    this.updateLibrary();
  }

  updateLibrary(offset) {
    offset = offset || 0;
    axios({
      method: "get",
      url: `api/spotify/library`,
      params: { offset: offset },
      headers: {}
    }).then(response => {
      response.data.items.forEach(item => {
        trackList.push({
          track: item.track.name,
          artist: item.track.album.artists[0].name,
          uri: item.track.uri
        });
      });
      this.setState({ songCount: trackList.length });
      if (response.data.next) {
        this.updateLibrary(offset + 50);
      }
    });
  }

  playSong(id, index) {
    axios.get(`api/spotify/player/play?value=${id}`);
    document.getElementById(`track${index}`).style.color = "#ff5e54";
    setTimeout(() => {
      document.getElementById(`track${index}`).style.color = "#ffffff";
    }, 5000);
  }

  render() {
    trackList.sort((a, b) => {
      switch (this.state.sortBy) {
        case "Artist":
          return a.artist < b.artist ? -1 : 1;
          break;
        case "Song":
          return a.track < b.track ? -1 : 1;
          break;
      }
    });
    const trackListUI = trackList.map((item, index) => (
      <div
        className="item"
        style={{
          padding: "12px 0px 12px 0px"
        }}
        key={index}
        onClick={() => this.playSong(item.uri, index)}
      >
        <div
          className="header"
          style={{
            marginBottom: "10px"
          }}
          id={`track${index}`}
        >
          {item.track}
        </div>
        <span
          style={{
            color: "#808080"
          }}
        >
          {item.artist}
        </span>
      </div>
    ));
    return (
      <div>
        <div
          style={{
            display: "flex"
          }}
        >
          <h2
            className="subtitle"
            style={{
              flexGrow: 1
            }}
          >
            Library
          </h2>
          <div
            style={{
              marginRight: "20px",
              color: "#808080",
              fontWeight: "bold"
            }}
          >
            Sort By
          </div>

          <div
            style={{
              marginRight: "20px",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: this.state.sortBy === "Artist" ? "#ff5e54" : "#ffffff"
            }}
            onClick={() => {
              this.setState({ sortBy: "Artist" });
            }}
          >
            Artist
          </div>
          <div
            style={{
              marginRight: "20px",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: this.state.sortBy === "Song" ? "#ff5e54" : "#ffffff"
            }}
            onClick={() => {
              this.setState({ sortBy: "Song" });
            }}
          >
            Song
          </div>
        </div>
        <div
          style={{
            maxHeight: "70vh",
            overflow: "scroll"
          }}
        >
          <div class="ui inverted segment">
            <div class="ui inverted relaxed divided list">{trackListUI}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyLibrary;
