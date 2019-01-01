import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import NavItem from "./NavItem/NavItem";

const Navbar = ({ passOnNavigation }) => {
  return (
    <div className="Navbar">
      <Link to={"/home"} className="Link">
        <NavItem item="home" icon="home" {...passOnNavigation} />
      </Link>
      <Link to={"/vehicle"} className="Link">
        <NavItem item="vehicle" icon="model_s" {...passOnNavigation} />
      </Link>
      <Link to={"/weather"} className="Link">
        <NavItem item="weather" icon="weather" {...passOnNavigation} />
      </Link>
      <Link to={"/spotify"} className="Link">
        <NavItem item="spotify" icon="spotify" {...passOnNavigation} />
      </Link>
    </div>
  );
};

export default Navbar;
