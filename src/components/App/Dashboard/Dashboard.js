import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Dashboard.css";
import Spotify from "./Spotify/Spotify";
import Weather from "./Weather/Weather";
import Vehicle from "./Vehicle/Vehicle";
import Home from "./Home/Home";

const Dashboard = ({
  longitude,
  latitude,
  weather_icon,
  weather_description,
  weather_units,
  weather_temperature,
  weather_city,
  passOnState,
  updateLocationBasedInformation
}) => {
  return (
    <div className="Dashboard">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route
          path="/weather"
          render={() => <Weather timeFormat="standard" units="imperial" />}
        />
        <Route path="/spotify" component={Spotify} />
        <Route path="/vehicle" render={() => <Vehicle />} />
        <Route path="/" render={() => <Dashboard cont="wat" />} />
      </Switch>
    </div>
  );
};

export default Dashboard;
