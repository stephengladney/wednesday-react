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
      <Link to={"/sports"} className="Link">
        <NavItem item="sports" icon="football ball" />
      </Link>
      <Link to={"/news"} className="Link">
        <NavItem item="news" icon="newspaper outline" />
      </Link>
      <Link to={"/games"} className="Link">
        <NavItem item="games" icon="gamepad" />
      </Link>
      <Link to={"/unomas"} className="Link">
        <NavItem item="unomas" icon="question circle outline" />
      </Link>
      <Link to={"/settings"} className="Link">
        <NavItem item="settings" icon="cogs" />
      </Link>
    </div>
  );
};

export default Navbar;
