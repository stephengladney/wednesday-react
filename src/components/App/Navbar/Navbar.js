import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import NavItem from "./NavItem/NavItem";

const Navbar = ({ passNavigationOn }) => {
  return (
    <div className="Navbar">
      <Link to={"/home"} className="Link">
        <NavItem item="home" icon="home" {...passNavigationOn} />
      </Link>
      <Link to={"/vehicle"} className="Link">
        <NavItem item="vehicle" icon="model_s" {...passNavigationOn} />
      </Link>
      <Link to={"/weather"} className="Link">
        <NavItem item="weather" icon="weather" {...passNavigationOn} />
      </Link>
      <Link to={"/spotify"} className="Link">
        <NavItem item="spotify" icon="spotify" {...passNavigationOn} />
      </Link>
    </div>
  );
};

export default Navbar;
