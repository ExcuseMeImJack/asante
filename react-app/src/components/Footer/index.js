import React from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="social-links">
          <div>About Asante</div>
          <div className="about-asante">
            Asante was developed using Python Flask, React, and Redux.
          </div>
        </div>

        <div className="social-links">
          <div>GitHub</div>
          <a href="https://github.com/koreanpro22">David</a> ·
          <a href="https://github.com/ExcuseMeImJack"> Jack</a> ·
          <a href="https://github.com/RMPasta"> Ryan</a> ·
          <a href="https://github.com/Kariyona"> Wyona</a>
        </div>

        <div className="social-links">
          <div>LinkedIn</div>
          <a href="https://www.linkedin.com/in/david-kim-a37b59274/">David</a> ·
          <a href="https://www.linkedin.com/in/jack-roybal-719909264/"> Jack</a> ·
          <a href="https://www.linkedin.com/in/ryan-malmos/"> Ryan</a> ·
          <a href="https://www.linkedin.com/in/wyona-b-602677224/"> Wyona</a>
        </div>
      </div>
    </>
  );
}

export default Footer;
