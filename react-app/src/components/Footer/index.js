import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="social-links">
        <div>GitHub</div>
        <Link href="">David · </Link>

        <Link href="https://github.com/ExcuseMeImJack">Jack · </Link>

        <Link href="">Ryan · </Link>

        <Link href="">Wyona</Link>
      </div>

      <div className="social-links">
        <div>LinkedIn</div>
        <Link href="">David</Link>
        <i className="fa-solid fa-star" />
        <Link href="https://github.com/ExcuseMeImJack">Jack</Link>
        <i className="fa-solid fa-star" />
        <Link href="">Ryan</Link>
        <i className="fa-solid fa-star" />
        <Link href="">Wyona</Link>
      </div>

      <div className="social-links">
        <div>About Asante</div>
        <div className="about-asante">Asante was built using react redux python javascript yummy yummy Asante was built using react redux python javascript yummy yummy</div>
      </div>
    </div>
  );
}

export default Footer;
