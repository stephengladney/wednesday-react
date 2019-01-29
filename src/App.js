import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/App/Navbar/Navbar";
import Dashboard from "./components/App/Dashboard/Dashboard";
import Wednesday from "./components/App/Wednesday/Wednesday";

class App extends Component {
  constructor(props) {
    super(props);
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
