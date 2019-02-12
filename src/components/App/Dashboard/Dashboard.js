import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Dashboard.css";
import Spotify from "./Spotify/Spotify";
import Weather from "./Weather/Weather";
import Vehicle from "./Vehicle/Vehicle";
import News from "./News/News";
import Settings from "./Settings/Settings";
import Home from "./Home/Home";

const Dashboard = () => {
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
        <Route path="/news" render={() => <News />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/" render={() => "wat"} />
      </Switch>
    </div>
  );
};

export default Dashboard;
