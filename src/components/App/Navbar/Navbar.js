import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import NavItem from "./NavItem/NavItem";

const Navbar = () => {
  return (
    <div className="Navbar">
      <Link to={"/home"} className="Link">
        <NavItem item="home" icon="home" />
      </Link>
      <Link to={"/vehicle"} className="Link">
        <NavItem item="vehicle" icon="model_s" />
      </Link>
      <Link to={"/weather"} className="Link">
        <NavItem item="weather" icon="weather" />
      </Link>
      <Link to={"/spotify"} className="Link">
        <NavItem item="spotify" icon="spotify" />
      </Link>
    </div>
  );
};

export default Navbar;
