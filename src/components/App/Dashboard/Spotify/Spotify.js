import React, { Component } from "react";
import SpotifyPlayer from "./SpotifyPlayer/SpotifyPlayer";
import SpotifyLibrary from "./SpotifyLibrary/SpotifyLibrary";
import Selector from "../Selector/Selector";
import SelectorOption from "../Selector/SelectorOption/SelectorOption";

// var timeMarker;

class Spotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      content: "Currently Playing"
    };
  }
  render() {
    var content;
    switch (this.state.content) {
      case "Library":
        content = <SpotifyLibrary />;
        break;
      case "Search":
        content = <h2 className="subtitle">Search</h2>;
        break;
      case "Currently Playing":
        content = <SpotifyPlayer />;
    }
    return (
      <div>
        <h1 className="title">spotify</h1>
        <div className="content">
          <Selector>
            <SelectorOption
              value="Library"
              selected={this.state.content}
              func={() => this.setState({ content: "Library" })}
              total={3}
            />
            <SelectorOption
              value="Currently Playing"
              selected={this.state.content}
              func={() => this.setState({ content: "Currently Playing" })}
              total={3}
            />
            <SelectorOption
              value="Search"
              selected={this.state.content}
              func={() => this.setState({ content: "Search" })}
              total={3}
            />
          </Selector>
          {content}
        </div>
      </div>
    );
  }
}

export default Spotify;
