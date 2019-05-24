import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1 className="title">Wednesday</h1>
      <div className="content">
        <div className="panelContainer">
          <div
            style={{
              width: "45%",
              marginBottom: "10px",
              backgroundColor: "red"
            }}
          >
            x
          </div>
          <div style={{ width: "45%", backgroundColor: "red" }}>x</div>
          <div style={{ width: "45%", backgroundColor: "red" }}>x</div>
          <div style={{ width: "45%", backgroundColor: "red" }}>x</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
