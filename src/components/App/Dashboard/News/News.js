import React, { Component } from "react";
import Selector from "../Selector/Selector";
import SelectorOption from "../Selector/SelectorOption/SelectorOption";
import "./News.css";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: "option2"
    };
  }
  render() {
    var wat;
    if (this.state.chosen === "option1") wat = "option wun";
    if (this.state.chosen === "option2") wat = "option too";
    if (this.state.chosen === "option3") wat = "option tree";
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h1 className="title">news</h1>
          <div
            className="newsApiWatermark"
            style={{
              margin: "13px 100px 0px 0px"
            }}
          >
            Powered by <a href="https://newsapi.org">NewsAPI.org</a>
          </div>
        </div>
        <Selector>
          <SelectorOption
            value="option1"
            selected={this.state.chosen}
            func={() => this.setState({ chosen: "option1" })}
          />
          <SelectorOption
            value="option2"
            selected={this.state.chosen}
            func={() => this.setState({ chosen: "option2" })}
          />
          <SelectorOption
            value="option3"
            selected={this.state.chosen}
            func={() => this.setState({ chosen: "option3" })}
          />
        </Selector>
        {wat}
      </div>
    );
  }
}

export default News;
