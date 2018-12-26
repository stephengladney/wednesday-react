import React, { Component } from "react";
import "./Navbar.css";
import NavItem from "./NavItem";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const passNavigationOn = {
      navigateTo: this.props.navigateTo,
      navigatedTo: this.props.navigatedTo
    };
    return (
      <div class="Navbar">
        <NavItem item="home" icon="home" {...passNavigationOn} />
        <NavItem item="weather" icon="umbrella" {...passNavigationOn} />
        <NavItem item="spotify" icon="spotify" {...passNavigationOn} />
      </div>
    );
  }
}
