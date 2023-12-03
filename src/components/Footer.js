import React from "react";
import { Link, useLocation } from "react-router-dom";
import  instagram  from '../Assets/instagram.svg';
import  linkdin  from '../Assets/linkdin.svg';
import  github  from '../Assets/github.svg';
import logo from "../Assets/logo.png"
export default function Footer() {
  const location = useLocation();
 
  return (
    <section className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="footer-first">
            <img src={logo} alt="" />
              {/* <h1>
                <b>Coinfolio</b>
                <span style={{ color: "#1DA1F2" }}>.</span>
              </h1> */}
              <p>
              Welcome to Your Crypto Portfolio Tracker! Our app is designed with a purpose – to help you manage your cryptocurrency investments and stay informed about the ever-changing world of digital currencies!
              </p>
              <ul>
                
                <li>
                  <Link to="https://www.linkedin.com/in/smeet-patel-963740230/" target="_blank" rel="noreferrer">
                  <img src={linkdin} alt="" />
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/Smeetpatel171" target="_blank" rel="noreferrer">
                  <img src={github} alt="" />
                  </Link>
                </li>
                <li>
                  <Link to="https://instagram.com/smeetpatel171?igshid=NGExMmI2YTkyZg==" target="_blank" rel="noreferrer">
                  <img src={instagram} alt="" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="footer-second">
              <h4>Useful Links</h4>
              <ul>
              <li>
                <Link
                  className={location.pathname === "/" ? "footeractive" : ""}
                  to="/"
                >
                  Cryptocurrencies
                </Link>
              </li>
              <li>
                <Link
                  className={
                    location.pathname === "/about" ? "footeractive" : ""
                  }
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={
                    location.pathname === "/services" ? "footeractive" : ""
                  }
                  to="/exchanges"
                >
                  Crypto-Exchanges
                </Link>
              </li>
              
              <li>
                <Link
                  className={
                    location.pathname === "/testimonials" ? "footeractive" : ""
                  }
                  to="/premium"
                >
                  Premium
                </Link>
              </li>
            </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer-third">
<h4>Contact Details</h4>
<div>Email<span>:</span><Link to="mailto:smeetpatel171@gmail.com">smeetpatel171@outlook.com</Link></div>
<div>Phone<span>:</span><Link to="tel:+919913886538">+919913886538</Link></div>          


<Link className="contactbutton" to="/contact">Contact Us</Link>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}
