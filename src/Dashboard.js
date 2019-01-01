import React, { Component } from "react";
import "./Dashboard.css";
import Marquee from "./Marquee";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Dashboard">
        <h1 className="title">Wednesday</h1>
        <Marquee text="Cake - Fashion Nugget" speed={600} />
      </div>
    );
  }
}
