import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/App/Navbar/Navbar";
import Dashboard from "./components/App/Dashboard/Dashboard";
import Wednesday from "./components/App/Wednesday/Wednesday";

import {
  todaysDate,
  myLocation,
  getWeatherByLocation,
  weatherIcon,
  isItDayOrNight
} from "./wednesday";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationCurrent:
        String(window.location.pathname).substring(1) || "home",
      latitude: 0,
      longitude: 0,
      weather_icon: "spinner",
      weather_description: "Weather loading...",
      weather_units: "imperial",
      weather_temperature: 0,
      weather_high: 0,
      weather_low: 0,
      weather_humidity: 0,
      weather_wind: 0,
      weather_sunrise: 0,
      weather_sunset: 0,
      weather_clouds: 0,
      weather_city: ""
    };
    this.navigateTo = this.navigateTo.bind(this);
    this.updateLocationBasedInformation = this.updateLocationBasedInformation.bind(
      this
    );
    setInterval(this.updateLocationBasedInformation, 1800000);
  }

  navigateTo(item) {
    this.setState({ navigationCurrent: item });
  }
  updateLocationBasedInformation() {
    this.setState({
      weather_icon: "spinner",
      weather_description: "Weather loading..."
    });
    myLocation()
      .catch(err => alert(`Error getting location: ${err}`))
      .then(coords => {
        this.setState(coords);
        return getWeatherByLocation(
          Number(coords.latitude).toFixed(4),
          Number(coords.longitude).toFixed(4),
          this.state.weather_units,
          process.env.REACT_APP_OPENWEATHER_KEY
        );
      })
      .then(response => {
        this.setState({
          weather_icon: weatherIcon(
            response.data.weather[0].id,
            isItDayOrNight(response.data.sys.sunset)
          ),
          weather_description: response.data.weather[0].description,
          weather_temperature: Number(response.data.main.temp).toFixed(),
          weather_city: response.data.name,
          weather_high: Number(response.data.main.temp_max).toFixed(),
          weather_low: Number(response.data.main.temp_min).toFixed(),
          weather_humidity: response.data.main.humidity,
          weather_wind: response.data.wind.speed,
          weather_sunrise: response.data.sys.sunrise,
          weather_sunset: response.data.sys.sunset,
          weather_clouds: response.data.clouds.all
        });
      })
      .catch(err => {
        this.setState({
          weather_icon: "unavailable",
          weather_description: `Weather unavailable (${err})`
        });
      });
  }

  componentDidMount() {
    this.updateLocationBasedInformation();
  }

  render() {
    const passOnNavigation = {
      navigateTo: this.navigateTo,
      navigationCurrent: this.state.navigationCurrent
    };

    const passOnState = {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      weather_icon: this.state.weather_icon,
      weather_description: this.state.weather_description,
      weather_units: this.state.weather_units,
      weather_temperature: this.state.weather_temperature,
      weather_city: this.state.weather_city,
      weather_high: this.state.weather_high,
      weather_low: this.state.weather_low,
      weather_humidity: this.state.weather_humidity,
      weather_wind: this.state.weather_wind,
      weather_sunrise: this.state.weather_sunrise,
      weather_sunset: this.state.weather_sunset,
      weather_clouds: this.state.weather_clouds
    };

    return (
      <div className="App">
        <Navbar passOnNavigation={passOnNavigation} />
        <Dashboard {...passOnState} passOnState={passOnState} />
        <Wednesday id="Wednesday" />
      </div>
    );
  }
}

export default App;
