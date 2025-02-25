import React from "react";
import "./stylesheets/Header.css";

/*Navigation bar for our website. Due to time constraints this is unfinished and acts 
as a header for now */
//Reference: https://www.w3schools.com/bootstrap/bootstrap_navbar.asp
function Header() {
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <h2 className="Header">Irish Weather Application</h2>
        </div>
      </nav>
    </>
  );
}

export default Header;
