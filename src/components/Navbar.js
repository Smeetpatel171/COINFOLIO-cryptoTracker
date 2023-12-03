import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
// import { useCurrencyContext } from "../context";
import { useCurrencyContext } from "../context";
import profileicon from "../Assets/profile.svg";
import logo from "../Assets/logo.png";
export default function Navbar() {
  // const {currency,setCurrency} = useCurrencyContext();
  //logic for "when we click on any nav-item in navbar toggler button then the navbar should close."

  //logic for Making the navbar sticky when the pageYoffest.
  //it is much more similer to the scrollToTop button.
  const [isSticky, setIsSticky] = useState(false);
  const { setCurrency, user } = useCurrencyContext();
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //handle the value of select element of currency.
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  //stroing the class in a variable as we need to add this along with jsx statement.
  const navbarclass = "nav-link";
  const parentnavbarclass = "navigation-bar";
  const location = useLocation();

  return (
    <>
      <header className={`${isSticky ? "sticky" : ""} ${parentnavbarclass}`}>
        <div className="container">
          <div className="row">
            <div className="col">
              <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">
                  <img src={logo} alt="" />
                  {/* <b>Coinfolio</b>
                    <span style={{ color: "#1DA1F2" }}>.</span> */}
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse navitems"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link
                        className={`${
                          location.pathname === "/" ? "activenav" : ""
                        } ${navbarclass}`}
                        aria-current="page"
                        to="/"
                      >
                        Cryptocurrencies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`${
                          location.pathname === "/exchanges" ? "activenav" : ""
                        } ${navbarclass}`}
                        aria-current="page"
                        to="/exchanges"
                      >
                        Crypto-Exchanges
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className={`${
                          location.pathname === "/about" ? "activenav" : ""
                        } ${navbarclass}`}
                        aria-current="page"
                        to="/about"
                      >
                        About
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className={`${
                          location.pathname === "/contact" ? "activenav" : ""
                        } ${navbarclass}`}
                        aria-current="page"
                        to="/contact"
                      >
                        Contact
                      </Link>
                    </li>
                    <li className="nav-item premiumnav">
                      <Link
                        className={`${
                          location.pathname === "/premium" ? "activenav" : ""
                        } ${navbarclass}`}
                        aria-current="page"
                        to="/premium"
                      >
                        Premium(₹)
                      </Link>
                    </li>
                    <li className="nav-item">
                      <select
                        onChange={handleChange}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                      </select>
                    </li>
                    {user ? (
                      
                      <li className="profilelist">
                        
                      <Link to="/profile" className="profileicon">
                        <img src={profileicon} alt="" />
                      </Link>
                    </li>
                    ) : (
                      <li>
                        <Link to="/loginsignup" className="loginSignupbtn">
                          Login/Signup
                        </Link>
                      </li>
                    )}
                    
                    
                  </ul>
                  
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
