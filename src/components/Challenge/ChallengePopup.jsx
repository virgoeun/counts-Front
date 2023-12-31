import React from "react";

import ChallengePopupFunction from "./ChallengePopupFunction";
import "../ProfilePopup/Popup.css";
import { useState, useEffect } from "react";
import event from "../../assets/event.jpg";

export default function ChallengePopup() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 100); //edit it later!
  }, []);

  return (
    <div className="popup">
      <main>
        <h1> Popup</h1>
        <br></br>
        <button onClick={() => setButtonPopup(true)}>Open Pop up</button>

        <ChallengePopupFunction
          trigger={timedPopup}
          setTrigger={setTimedPopup}
        ></ChallengePopupFunction>
      </main>
    </div>
  );
}
