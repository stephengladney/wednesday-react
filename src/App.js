import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Wednesday from "./components/App/Wednesday/Wednesday";
import NavItem from "./components/App/NavItem/NavItem";
import Spotify from "./components/App/Spotify/Spotify";
import Weather from "./components/App/Weather/Weather";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationCurrent: String(window.location.pathname).substring(1) || "home"
    };
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(item) {
    this.setState({ navigationCurrent: item });
  }

  render() {
    const passNavigationOn = {
      navigateTo: this.navigateTo,
      navigationCurrent: this.state.navigationCurrent
    };
    return (
      <Router>
        <div className="App">
          <div className="Navbar">
            <Link to={`/home`} className="Link">
              <NavItem item="home" icon="home" {...passNavigationOn} />
            </Link>
            <Link to={`/weather`} className="Link">
              <NavItem item="weather" icon="umbrella" {...passNavigationOn} />
            </Link>
            <Link to={`/spotify`} className="Link">
              <NavItem item="spotify" icon="spotify" {...passNavigationOn} />
            </Link>
          </div>
          <Switch>
            <Route exact path="/" render={() => <Dashboard cont="home" />} />
            <Route path="/home" render={() => <Dashboard cont="home" />} />
            <Route path="/weather" component={Weather} />
            <Route path="/spotify" component={Spotify} />
            <Route path="/" render={() => <Dashboard cont="wat" />} />
          </Switch>
          <Wednesday id="Wednesday" />
        </div>
      </Router>
    );
  }
}

export default App;
