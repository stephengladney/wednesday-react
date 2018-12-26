import React from "react";
import "./NavItem.css";

const NavItem = ({ item, icon, navigateTo, navigatedTo }) => {
  return (
    <div
      style={{
        backgroundColor: navigatedTo === item ? "#555555" : "#111111"
      }}
      class="navItem"
    >
      <i class={icon + " icon huge"} onClick={() => navigateTo(item)} />
    </div>
  );
};

export default NavItem;
