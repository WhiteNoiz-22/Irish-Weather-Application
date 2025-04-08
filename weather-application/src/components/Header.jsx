import React from "react";
import "./stylesheets/Header.css";
import { Link } from "react-router-dom";


//Reference: https://www.w3schools.com/bootstrap/bootstrap_navbar.asp
function Header() {
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <h2 className="Header">Irish Weather Application</h2>
          <div>
            <Link to="/" className="navlink">
              Home
            </Link>
            {" "}
            <Link to="hourly" className="navlink">
            Hourly Forecasts
            </Link>
            {" "}
            <Link to="/map" className="navlink">
              Map
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
