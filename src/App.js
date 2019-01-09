import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/App/Navbar/Navbar";
import Dashboard from "./components/App/Dashboard/Dashboard";
import Wednesday from "./components/App/Wednesday/Wednesday";

import {
  todaysDate,
  myLocation,
  getCurrentWeatherByLocation,
  weatherIcon,
  isItDayOrNight,
  updateLocationBasedInfo
} from "./wednesday";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    this.setState({
      weather_icon: "spinner",
      weather_description: "Weather loading..."
    });
    updateLocationBasedInfo().then(newInfo => {
      this.setState({
        latitude: newInfo.latitude,
        longitude: newInfo.longitude
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Dashboard />
        <Wednesday id="Wednesday" />
      </div>
    );
  }
}

export default App;
