import React from "react";
import "./NavItem.css";

const NavItem = ({ item, icon, navigationCurrent, navigateTo }) => {
  switch (icon) {
    case "model_s":
      icon = (
        <img
          src="images/model_s.svg"
          style={{ height: "112px", width: "112px" }}
          alt="model s"
        />
      );
      break;
    case "weather":
      icon = (
        <img
          src="images/weather_icons/cloud_sun.png"
          style={{ height: "65px", width: "65px" }}
          alt="weather"
        />
      );
      break;
    default:
      icon = <i className={icon + " icon huge"} />;
  }
  return (
    <div
      style={{
        backgroundColor: navigationCurrent === item ? "#555555" : "#111111"
      }}
      className="navItem"
      onClick={() => navigateTo(item)}
    >
      <span className="helper" />
      {icon}
    </div>
  );
};

export default NavItem;
