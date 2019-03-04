import React, { Component } from "react";
import axios from "axios";
import "./SpotifyLibrary.css";
import { utimesSync } from "fs";
import Loading from "../../Loading";

let spotifyLibrary = [];
let artistList = [];
let uiList;

class SpotifyLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listBy: "Artist",
      currentView: "Artists",
      currentArtist: null,
      songCount: 0
    };
    spotifyLibrary = [];
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
        spotifyLibrary.push({
          track: item.track.name,
          artist: item.track.album.artists[0].name,
          uri: item.track.uri
        });
      });
      // this.setState({ songCount: spotifyLibrary.length });
      if (response.data.next) {
        this.updateLibrary(offset + 50);
      } else {
        artistList = spotifyLibrary.map(item => item.artist);
        const artistSet = new Set(artistList);
        artistList = Array.from(artistSet).sort((a, b) => {
          return String(a).toLowerCase() < String(b).toLowerCase() ? -1 : 1;
        });
        this.setState({ loading: false });
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
    if (this.state.loading === true) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    // songList.sort((a, b) => {
    //   switch (this.state.listBy) {
    //     case "Artist":
    //
    //       break;
    //     case "Song":
    //       return String(a.track).toLowerCase() < String(b.track).toLowerCase()
    //         ? -1
    //         : 1;
    //       break;
    //   }
    // });
    let sortBy = null;
    switch (this.state.currentView) {
      case "Artists":
        uiList = artistList;
        break;
      case "Songs":
        uiList = spotifyLibrary;
        break;
      case "Artist Songs":
        uiList = spotifyLibrary.filter(
          item => item.artist == this.state.currentArtist
        );
        break;
    }
    if (this.state.currentView != "Artists") {
      sortBy = (
        <div
          style={{
            display: "flex"
          }}
        >
          <h2
            className="subtitle"
            style={{
              flexGrow: 1,
              marginBottom: "0px",
              color: "#000000"
            }}
            onClick={() => {
              if (this.state.currentView === "Artist Songs")
                this.setState({ currentView: "Artists" });
            }}
          >
            X
            {this.state.currentView === "Artist Songs"
              ? `> ${this.state.currentArtist}`
              : null}
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
              color: this.state.listBy === "Artist" ? "#ff5e54" : "#ffffff"
            }}
            onClick={() => {
              this.setState({
                listBy: "Artist",
                currentView: "Artists"
              });
            }}
          >
            Song
          </div>
          <div
            style={{
              marginRight: "20px",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: this.state.listBy === "Song" ? "#ff5e54" : "#ffffff"
            }}
            onClick={() => {
              this.setState({
                listBy: "Song",
                currentView: "Songs"
              });
            }}
          >
            Artist
          </div>
          <div
            style={{
              marginRight: "20px",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: this.state.listBy === "Song" ? "#ff5e54" : "#ffffff"
            }}
            onClick={() => {
              this.setState({
                listBy: "Song",
                currentView: "Songs"
              });
            }}
          >
            Date Added
          </div>
        </div>
      );
    } else {
      sortBy = (
        <div
          style={{
            display: "flex"
          }}
        >
          <h2
            className="subtitle"
            style={{
              flexGrow: 1,
              marginBottom: "0px",
              color: "#000000"
            }}
            onClick={() => {
              if (this.state.currentView === "Artist Songs")
                this.setState({ currentView: "Artists" });
            }}
          >
            X
          </h2>
        </div>
      );
    }
    const libraryListUI = uiList.map((item, index) => (
      <div
        className="item"
        style={{
          padding: "12px 0px 12px 0px"
        }}
        key={index}
        onClick={() => {
          switch (this.state.currentView) {
            case "Artists":
              this.setState({
                currentView: "Artist Songs",
                currentArtist: item
              });
              break;
            default:
              this.playSong(item.uri, index);
          }
        }}
      >
        <div className="itemflex">
          <div id={`track${index}`} className="result first">
            {this.state.currentView === "Songs" ||
            this.state.currentView === "Artist Songs"
              ? item.track
              : item}
          </div>
          <div className="result second">
            {this.state.currentView === "Songs" ||
            this.state.currentView === "Artist Songs"
              ? item.artist
              : null}
          </div>
          <div className="result placeholder">_</div>
        </div>
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
              // marginBottom: "0px"
            }}
            onClick={() => {
              if (this.state.currentView === "Artist Songs")
                this.setState({ currentView: "Artists" });
            }}
          >
            Library{" "}
            {this.state.currentView === "Artist Songs"
              ? `> ${this.state.currentArtist}`
              : null}
          </h2>
          <div
            style={{
              marginRight: "20px",
              color: "#808080",
              fontWeight: "bold"
            }}
          >
            List By
          </div>

          <div
            style={{
              marginRight: "20px",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: this.state.listBy === "Artist" ? "#ff5e54" : "#ffffff"
            }}
            onClick={() => {
              this.setState({
                listBy: "Artist",
                currentView: "Artists"
              });
            }}
          >
            Artist
          </div>
          <div
            style={{
              marginRight: "20px",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: this.state.listBy === "Song" ? "#ff5e54" : "#ffffff"
            }}
            onClick={() => {
              this.setState({
                listBy: "Song",
                currentView: "Songs"
              });
            }}
          >
            Song
          </div>
        </div>
        {sortBy}
        <div
          style={{
            maxHeight: "70vh",
            overflow: "scroll"
          }}
        >
          <div class="ui inverted segment">
            <div class="ui inverted relaxed divided list">{libraryListUI}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyLibrary;
