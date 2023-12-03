import React, { useState,useEffect } from "react";
import location from "../../Assets/location.svg";
import mail from "../../Assets/mail.svg";
import time from "../../Assets/time.svg";
import call from "../../Assets/call.svg";
export default function Contact() {
  //handling the values of forms when value changes as usual in react.
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });
const [waitingmessage, setwaitingmessage] = useState(false);
const [isMessageSent, setMessageSent] = useState(false);
//we just need to show message sent for 8 second..
useEffect(() => {
  if (isMessageSent) {
    const timer = setTimeout(() => {
      setMessageSent(false);
      setwaitingmessage(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }
}, [isMessageSent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [formerror, setFormError] = useState({});
  const validation = () => {
    let err = {};
    // we will validate each input field over here step by step
    //validation code
    if (formData.user_name === "") {
      err.user_name = "Name Required !";
    } else {
      if (formData.user_name.length <= 1) {
        err.user_name = "Name should be atleast 2 character";
      }
    }
    if (formData.user_email === "") {
      err.user_email = "E-mail Required !";
    } else {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(formData.user_email)) {
        err.user_email = "Email not valid!";
      }
    }
    if (formData.subject === "") {
      err.subject = "Subject Required !";
    } else {
      if (formData.subject.length <= 1) {
        err.subject = "Please enter Relevent Subject !";
      }
    }
    if (formData.message === "") {
      err.message = "Message Required !";
    } else {
      if (formData.message.length <= 1) {
        err.message = "Please enter Relevent Message !";
      }
    }

    setFormError({ ...err });
    return Object.keys(err).length < 1;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    let isvalid = validation();
    if (isvalid) {
      setwaitingmessage(true);
      await fetch("https://portfoliobackend-9vzm.onrender.com/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.user_email,
          name: formData.user_name,
          subject: formData.subject,
          message: formData.message,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the API response data here
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setMessageSent(true);

      setFormData({ user_name: "", user_email: "", subject: "", message: "" });
    }
  };

  return (
   <div className="contactpage">
    <div className="heading">
        <h2>Contact Us</h2>
        
      </div>
     <section className="container">
    
       <div className="contactbox">
         <div className="row">
           <div className="col-lg-4">
             <div className="contactlinks">
               {/* <!-- firstitem --> */}
    
               <div className="row">
                 <div className="col">
                   <div className="contactformitem">
                     <div className="contactformicon">
                       <img src={location} alt="" />
                     </div>
    
                     <div className="formicondesc">
                       <span>Location:</span>
                       <p>Ahmedabad,INDIA</p>
                     </div>
                   </div>
                 </div>
               </div>
               {/* <!-- seconditem      --> */}
               <div className="row">
                 <div className="col">
                   <div className="contactformitem contactform-email">
                     <div className="contactformicon">
                       <img src={mail} alt="" />
                     </div>
    
                     <div className="formicondesc">
                       <span>E-mail:</span>
                       <p>smeetpatel171@outlook.com</p>
                     </div>
                   </div>
                 </div>
               </div>
    
               {/* <!-- thirditem --> */}
               <div className="row">
                 <div className="col">
                   <div className="contactformitem">
                     <div className="contactformicon">
                       <img src={call} alt="" />
                     </div>
                     <div className="formicondesc">
                       <span>Call:</span>
                       <p>+919913886538 </p>
                     </div>
                   </div>
                 </div>
               </div>
               {/*forth item*/}
               <div className="row">
                 <div className="col">
                   <div className="contactformitem">
                     <div className="contactformicon">
                       <img src={time} alt="" />
                     </div>
                     <div className="formicondesc">
                       <span>Availability:</span>
                       <p>Mon-Sat: 10PM-3AM</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="col-lg-8 ">
             <form action="" className="contactform" onSubmit={handlesubmit}>
               <div className="row">
                 <div className="col-lg-6">
                   <input
                     type="text"
                     className="formitem"
                     placeholder="Your Name"
                     name="user_name"
                     onChange={handleChange}
                     value={formData.user_name}
                   />
                   <span className="formhandle">{formerror.user_name}</span>
                 </div>
                 <div className="col-lg-6">
                   <input
                     type="text"
                     className="formitem"
                     name="user_email"
                     placeholder="Your Email"
                     onChange={handleChange}
                     value={formData.user_email}
                   />
                   <span className="formhandle">{formerror.user_email}</span>
                 </div>
                 <div className="col-lg-12">
                   <input
                     type="text"
                     className="formitem"
                     placeholder="Subject"
                     name="subject"
                     onChange={handleChange}
                     value={formData.subject}
                   />
                   <span className="formhandle">{formerror.subject}</span>
                 </div>
                 <div className="col-lg-12">
                   <textarea
                     name="message"
                     className="text"
                     placeholder="Message"
                     onChange={handleChange}
                     value={formData.message}
                   ></textarea>
                   <span className="formhandle">{formerror.message}</span>
                 </div>
                 <div className="col-lg-12">
                   <input
                     type="submit"
                     className="formbtn"
                     value="Send Message"
                   />
                   <div className="message-sent">{isMessageSent===false && waitingmessage===true ?"Please Wait,Sending Message...":""}</div>
                   <div className= {isMessageSent?"message-sent":"message-notsent"}>I have received your submission and will get back to you shortly.</div>
                 </div>
               </div>
             </form>
           </div>
         </div>
       </div>
     </section>
   </div>
  );
}
