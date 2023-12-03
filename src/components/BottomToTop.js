import React from 'react'
import Uparrow from "../Assets/uparrow.svg"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function BottomToTop() {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    onTop();
  }, [routePath]);

  //logic for onclick event and scroll to top

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  //logic for the visibility of button

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
     <div
      className={`scrollToTopButton ${isVisible ? "visible" : ""}`}
      onClick={handleScrollToTop}
    ><img src={Uparrow} alt="scrolltotop" />
    </div>
    
    </>
  )
}
