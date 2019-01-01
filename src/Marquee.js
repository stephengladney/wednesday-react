import React, { Component } from "react";

export default class Marquee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.text
    };
    let position = 0;
    this.marqueeInterval = setInterval(() => {
      let text = String(this.props.text).replace(/ /g, "\xa0") + "\xa0";
      if (position === String(text).length) {
        position = 0;
      } else {
        position++;
      }
      this.setState({
        display:
          String(text).substring(position) + String(text).substr(0, position)
      });
    }, this.props.speed);
  }

  componentWillUnmount() {
    clearInterval(this.marqueeInterval);
  }

  render() {
    return <span>{this.state.display}</span>;
  }
}
