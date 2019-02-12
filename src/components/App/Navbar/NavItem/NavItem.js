import React from "react";
import "./NavItem.css";
let location;

const NavItem = ({ item, icon }) => {
  if (window.location.pathname === "/") {
    location = "home";
  } else {
    location = String(window.location.pathname).substring(1);
  }
  switch (icon) {
    case "model_s":
      icon = (
        <img
          src="images/model_s.svg"
          style={{ height: "56px", width: "56px" }}
          alt="model s"
        />
      );
      break;
    case "weather":
      icon = (
        <img
          src="images/weather_icons/partly-cloudy-day.png"
          style={{ height: "32px", width: "32px" }}
          alt="weather"
        />
      );
      break;
    default:
      icon = <i className={icon + " icon big"} />;
  }
  return (
    <div
      style={{
        backgroundColor: location === item ? "#555555" : "#111111"
      }}
      className="navItem"
    >
      <span className="helper" />
      {icon}
    </div>
  );
};

export default NavItem;
