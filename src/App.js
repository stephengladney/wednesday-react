import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Wednesday from "./Wednesday";
import NavItem from "./NavItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigatedTo: "none"
    };
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(item) {
    this.setState({ navigatedTo: item });
  }

  render() {
    return (
      <div className="App">
        <Navbar
          navigateTo={this.navigateTo}
          navigatedTo={this.state.navigatedTo}
        />
        <Dashboard cont={this.state.navigatedTo} />
        <Wednesday id="Wednesday" />
      </div>
    );
  }
}

export default App;
