import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import { setCookie } from "../../wednesday";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rememberMe: true
    };
    this.toggleRemember = this.toggleRemember.bind(this);
    this.authorizeMe = props.authorizeMe;
  }

  toggleRemember() {
    this.setState({ rememberMe: !this.state.rememberMe });
  }

  render() {
    const checkbox = (
      <input
        type="checkbox"
        tabindex="0"
        id="rememberMe"
        checked={this.state.rememberMe}
        onChange={this.toggleRemember}
      />
    );

    return (
      <div>
        <div className="loginContainer">
          <img src="/images/wednesday_login.png" className="wednesday" />
          <div>
            <h1 id="loginHeader">Not so fast.</h1>
            <div className="ui inverted segment">
              <form class="ui inverted form">
                <div class="field">
                  <label>Username</label>
                  <input
                    type="text"
                    id="username"
                    placeholder=""
                    style={{
                      background: "#000000",
                      color: "#ffffff"
                    }}
                  />
                </div>
                <div class="field">
                  <label>Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder=""
                    style={{
                      background: "#000000",
                      color: "#ffffff"
                    }}
                  />
                </div>
                <div class="field">
                  <div class="ui checkbox">
                    {checkbox}
                    <label onClick={this.toggleRemember}>Remember me</label>
                  </div>
                </div>
                <button
                  class="ui inverted button"
                  onClick={e => {
                    const usernameSubmitted = document.getElementById(
                      "username"
                    ).value;
                    const pwSubmitted = document.getElementById("password")
                      .value;
                    const rememberMe = document.getElementById("rememberMe")
                      .checked;
                    e.preventDefault();
                    axios({
                      method: "post",
                      url: `api/authorize`,
                      params: {
                        user: usernameSubmitted,
                        password: pwSubmitted
                      },
                      headers: {}
                    })
                      .then(resp => {
                        if (rememberMe) setCookie("sessionid", "1", 30);
                        this.authorizeMe();
                      })
                      .catch(err => {
                        document.getElementById("loginHeader").innerHTML =
                          "Nope.";
                      });
                  }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
