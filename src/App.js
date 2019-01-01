import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Wednesday from "./components/App/Wednesday/Wednesday";
import Navbar from "./components/App/Navbar/Navbar";
import Spotify from "./components/App/Spotify/Spotify";
import Weather from "./components/App/Weather/Weather";
import Vehicle from "./components/App/Vehicle/Vehicle";
import {
  todaysDate,
  myLocation,
  weather,
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
      .then(coords => {
        this.setState(coords);
        return weather(
          Number(coords.latitude).toFixed(4),
          Number(coords.longitude).toFixed(4),
          this.state.weather_units,
          process.env.REACT_APP_OPENWEATHER_KEY
        );
      })
      .catch(err => alert(`Error getting location: ${err}`))
      .then(response => {
        this.setState({
          weather_icon: weatherIcon(
            response.data.weather[0].id,
            isItDayOrNight(response.data.sys.sunset)
          ),
          weather_description: response.data.weather[0].description,
          weather_temperature: Number(response.data.main.temp).toFixed(),
          weather_city: response.data.name
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
    const passNavigationOn = {
      navigateTo: this.navigateTo,
      navigationCurrent: this.state.navigationCurrent
    };
    return (
      <Router>
        <div className="App">
          <Navbar passNavigationOn={passNavigationOn} />
          <Switch>
            <Route exact path="/" render={() => <Dashboard cont="home" />} />
            <Route path="/home" render={() => <Dashboard cont="home" />} />
            <Route
              path="/weather"
              render={() => (
                <Weather
                  longitude={this.state.longitude}
                  latitude={this.state.latitude}
                  weather_icon={this.state.weather_icon}
                  weather_description={this.state.weather_description}
                  weather_units={this.state.weather_units}
                  weather_temperature={this.state.weather_temperature}
                  weather_city={this.state.weather_city}
                />
              )}
            />
            <Route path="/spotify" component={Spotify} />
            <Route path="/vehicle" render={() => <Vehicle />} />
            <Route path="/" render={() => <Dashboard cont="wat" />} />
          </Switch>
          <Wednesday id="Wednesday" />
        </div>
      </Router>
    );
  }
}

export default App;
