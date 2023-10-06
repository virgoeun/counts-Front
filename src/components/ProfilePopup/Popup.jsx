import React from "react";
import PopupFunction from "./PopupFunction";
import "./Popup.css";
import { useState, useEffect } from "react";
import popupImage from "../../assets/hearts/heart-black.png";

export default function Popup() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown || popupShown !== "true") {
      setTimeout(() => {
        setTimedPopup(true);
        localStorage.setItem("popupShown", "true");
      }, 3000); // Edit it later!
    }
  }, []);


  return (
    <div className="popup">
      <main>
        {/* <h1> Popup</h1> */}
        <br></br>
        {/* <button onClick={() => setButtonPopup(true)}>Open Pop up</button> */}
        {/* <PopupFunction trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>My Popup</h3>
          <p>This is my Button triggered popup!</p>
        </PopupFunction> */}

        <PopupFunction trigger={timedPopup} setTrigger={setTimedPopup} imgSrc={popupImage}>
        <h3 className="mt-3 mb-3">Counts X Little Green Rabbit</h3>
        <p>Get your FREE Smoothie! 🥤</p>
         
        </PopupFunction>
      </main>
    </div>
  );
}

