import React, { Component } from "react";
import Selector from "../Selector/Selector";
import SelectorOption from "../Selector/SelectorOption/SelectorOption";
import "./News.css";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Headlines"
    };
  }
  render() {
    const content = <h2 className="subtitle">{this.state.content}</h2>;
    return (
      <div>
        <h1 className="title">news</h1>
        <div className="content">
          <Selector>
            <SelectorOption
              value="Headlines"
              selected={this.state.content}
              func={() => this.setState({ content: "Headlines" })}
              total={6}
            />
            <SelectorOption
              value="Entertainment"
              selected={this.state.content}
              func={() => this.setState({ content: "Entertainment" })}
              total={6}
            />
            <SelectorOption
              value="Sports"
              selected={this.state.content}
              func={() => this.setState({ content: "Sports" })}
              total={6}
            />
            <SelectorOption
              value="Science"
              selected={this.state.content}
              func={() => this.setState({ content: "Science" })}
              total={6}
            />
            <SelectorOption
              value="Tech"
              selected={this.state.content}
              func={() => this.setState({ content: "Tech" })}
              total={6}
            />
            <SelectorOption
              value="Search"
              selected={this.state.content}
              func={() => this.setState({ content: "Search" })}
              total={6}
            />
          </Selector>
          {content}
        </div>
      </div>
    );
  }
}

export default News;
