import React from "react";
import point from "../../Assets/point.svg";
const About = () => {
  return (
    <div className="aboutpage">
      <div className="container">
        <div className="about-content">
          <div className="heading">
            <h2>About Us</h2>
            <p>
            Welcome to Your Crypto Portfolio Tracker! Our app is designed with a purpose – to help you manage your cryptocurrency investments and stay informed about the ever-changing world of digital currencies.
            </p>
          </div>
          <div className="heading">
            <h3>Technologies Used</h3>
            <p>
            Our app is built using cutting-edge technologies, including React.js, Bootstrap, HTML, CSS, JavaScript, Firebase, and Chart.js. These technologies work in harmony to provide you with a seamless and informative crypto tracking experience.
            </p>
            
          </div>
          <div className="heading">
            <h3>Key Features</h3>
          </div>
          <div className="skills">
            <div>
              <img src={point} alt="" />
              <p>
              Effortlessly manage your crypto portfolio.
              </p>
            </div>
            <div>
              <img src={point} alt="" />
              <p>
              Stay up-to-date with real-time cryptocurrency data
              </p>
            </div>
            <div>
              <img src={point} alt="" />
              <p>
              Make informed investment decisions with interactive charts.
              </p>
            </div>
            <div>
              <img src={point} alt="" />
              <p>
              Pesonalized Email Alerts for your portfolio tracking, we will remind you the status of your Portfolio and make you aware of the drastically changes appear in your portfolio.
              </p>
            </div>
            <div>
              <img src={point} alt="" />
              <p>
                You can Add your Favourite coins in your portfolio watchlist tab so that you can moniter the realtime changes in Those Coins.
              </p>
            </div>
          </div>
          <div className="aboutfooter">
            <p>Don't Forget to Ckeckout Our Premium version  By clicking on Premium Tab.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
