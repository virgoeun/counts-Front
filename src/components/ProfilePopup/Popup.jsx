import React from "react";
import PopupFunction from "./PopupFunction";
import "./Popup.css";
import { useState, useEffect } from "react";

export default function Popup() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 3000); //edit it later!
  }, []);

  return (
    <div className="popup">
      <main>
        <h1> Popup</h1>
        <br></br>
        <button onClick={() => setButtonPopup(true)}>Open Pop up</button>
        {/* <PopupFunction trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>My Popup</h3>
          <p>This is my Button triggered popup!</p>
        </PopupFunction> */}

        <PopupFunction trigger={timedPopup} setTrigger={setTimedPopup}>
          <h3>My Second try Popup</h3>
          <p>This is my Timed popup!</p>
        </PopupFunction>
      </main>
    </div>
  );
}
