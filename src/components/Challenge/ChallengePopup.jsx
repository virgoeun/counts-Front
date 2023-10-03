import React from "react";

import ChallengePopupFunction from "./ChallengePopupFunction";
import "../ProfilePopup/Popup.css"
import { useState, useEffect } from "react";

export default function ChallengePopup() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 300); //edit it later!
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

        <ChallengePopupFunction trigger={timedPopup} setTrigger={setTimedPopup}>
          {/* <h3>My Second Popup</h3>
          <p>This is my Timed popup!</p> */}
        </ChallengePopupFunction>
      </main>
    </div>
  );
}
