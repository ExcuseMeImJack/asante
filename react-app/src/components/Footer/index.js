import React from "react";

import "./footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="social-links">
        <div className="about-asante">Asante was developed using Python, Flask, React, and Redux.</div>
        {/* <div className="about-asante">Asante was developed using Python Flask for the backend, React for the frontend, and Redux for state management.</div> */}
      </div>

      <div className="social-links">
        <i className="fa-brands fa-github"></i>
        <a href="https://github.com/koreanpro22" target="_blank">David</a> ·
        <a href="https://github.com/ExcuseMeImJack" target="_blank">Jack</a> ·
        <a href="https://github.com/RMPasta" target="_blank">Ryan</a> ·
        <a href="https://github.com/Kariyona" target="_blank">Wyona</a>
      </div>

      <div className="social-links">
        <i className="fa-brands fa-linkedin"></i>
        <a href="https://www.linkedin.com/in/david-kim-a37b59274/" target="_blank">David</a> ·
        <a href="https://www.linkedin.com/in/jroybaldev/" target="_blank">Jack</a> ·
        <a href="https://www.linkedin.com/in/ryan-malmos/" target="_blank">Ryan</a> ·
        <a href="https://www.linkedin.com/in/wyonadev/" target="_blank">Wyona</a>
      </div>

    </footer>
  );
}

export default Footer;
