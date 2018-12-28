import React from "react";
import "./NavItem.css";

const NavItem = ({ item, icon, navigationCurrent, navigateTo }) => {
  return (
    <div
      style={{
        backgroundColor: navigationCurrent === item ? "#555555" : "#111111"
      }}
      className="navItem"
      onClick={() => navigateTo(item)}
    >
      <i className={icon + " icon huge"} />
    </div>
  );
};

export default NavItem;
