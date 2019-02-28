import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/App/Navbar/Navbar";
import Dashboard from "./components/App/Dashboard/Dashboard";
import Wednesday from "./components/App/Wednesday/Wednesday";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastHeartbeat: Date.now()
    };
    this.pulseCheck = this.pulseCheck.bind(this);
  }
  componentDidMount() {
    this.heartBeat = setInterval(this.pulseCheck, 60000);
  }
  pulseCheck() {
    if (Date.now() - this.state.lastHeartbeat > 120000) {
      alert("Heartbeat was missed");
      window.location.reload();
    } else {
      this.setState({
        lastHeartbeat: Date.now()
      });
    }
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
