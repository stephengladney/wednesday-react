import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/App/Navbar/Navbar";
import Dashboard from "./components/App/Dashboard/Dashboard";
import Wednesday from "./components/App/Wednesday/Wednesday";
import { getCookie } from "./wednesday";
import Login from "./components/App/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastHeartbeat: Date.now(),
      authorized: false
    };
    this.pulseCheck = this.pulseCheck.bind(this);
    this.authorizeMe = this.authorizeMe.bind(this);
  }
  componentDidMount() {
    this.heartBeat = setInterval(this.pulseCheck, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.heartBeat);
  }

  authorizeMe() {
    this.setState({ authorized: true });
  }

  pulseCheck() {
    if (Date.now() - this.state.lastHeartbeat > 120000) {
      clearInterval(this.heartBeat);
      const currentApp = String(window.location.pathname).substring(1);
      switch (currentApp) {
        case "spotify":
          setTimeout(() => window.location.reload(), 10000);
          break;
        default:
          window.location.reload();
      }
    } else {
      this.setState({
        lastHeartbeat: Date.now()
      });
    }
  }

  render() {
    const sessionId = getCookie("sessionid");
    if (!this.state.authorized && sessionId) {
      this.setState({ authorized: true });
    }
    if (!this.state.authorized) {
      return (
        <div>
          <Login authorizeMe={this.authorizeMe} />
        </div>
      );
    }
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
