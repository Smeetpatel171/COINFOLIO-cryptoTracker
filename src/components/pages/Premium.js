import React from "react";
import point from "../../Assets/point.svg";
import { Link } from "react-router-dom";
export default function Premium() {

 //payment Gateway Info:
//  const loadscript = (src)=>{

//   return new Promise((resolve)=>{
//     const script = document.createElement('script');
//     script.src = src;
//     script.onload = ()=>{
//       resolve(true);
//     }
//     script.onerror = ()=>{
//       resolve(false);
//     }
//     document.body.appendChild(script);

//   })
// }

// const displayrazorpay = async (amount)=>{
//  const res = await loadscript("https://checkout.razorpay.com/v1/checkout.js");

//  if(!res){
//   alert("you are Offline... Filed to load....")
//  }

//  const options = {
//   key:"rzp_test_Fzn9c61B3PWTca",
//   currency : "INR",
//   amount : amount * 100,
//   name : "Coinfolio",
//   description : "Buy Our Premium Plan",
//   // image: "just provide your website logo url over here"
//   // then comes the handler function which is very important
//   handler : async function(response){
//     alert(response.razorpay_payment_id);
//        console.log(response);
    
//   },
//   prefill: {
//     name:"Milan Oza"
//   }

// };
// const paymentObject = new window.Razorpay(options);
// paymentObject.open();

// }
 
  return (
    <div className="premium-page">
      <div className="container">
        <div className="row premium-row">
          <div className="col-lg-6">

          
          <div className="heading">
            <h3>Key Features For Free User</h3>
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
              Stay up-to-date with real-time cryptocurrency data.
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
                You can Add your Favourite coins in your portfolio watchlist tab so that you can moniter the realtime changes in Those Coins.
              </p>
            </div>
            <div>
              <img src={point} alt="" />
              <p className="Checked">
              Pesonalized Email Alerts for your portfolio tracking, we will remind you the status of your Portfolio and make you aware of the drastically changes appear in your portfolio.
              </p>
            </div>
          </div>


          </div>
          <div className="col-lg-6">

          <div className="right-premium">

          <div className="heading">
            <h3>Key Features For Premium User</h3>
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
              Stay up-to-date with real-time cryptocurrency data.
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
                You can Add your Favourite coins in your portfolio watchlist tab so that you can moniter the realtime changes in Those Coins.
              </p>
            </div>
            <div>
              <img src={point} alt="" />
              <p className="premium-feature">
              Pesonalized Email Alerts for your portfolio tracking, we will remind you the status of your Portfolio and make you aware of the drastically changes appear in your portfolio.
              </p>
            </div>
            <div>
              <img src={point} alt="" />
              <p className="premium-feature">
              Buy Now for 500 Rs./Month.
              </p>
            </div>
            <div className="prebtn-div" 
            // onClick={displayrazorpay(500)}
            >
              <Link className= "premiumbtn">Subscribe Now</Link></div>
          </div>


          </div>
          

          </div>
        </div>


      </div>
    </div>
  )
}
