import React, { Component } from "react";
import "./Dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Dashboard">
        <h1 style={{ margin: "25%" }}>{this.props.cont}</h1>
      </div>
    );
  }
}
