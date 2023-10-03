import React from "react";
import { Link } from "react-router-dom";
import challenge from "../../assets/challenge.png"

function ChallengePopupFunction(props) {
  
  return props.trigger ? (
    <div className="popup-overlay">
    <div className="challnge-popup-outer">
      <div className="challnge-popup-inner">
      <img src={challenge} alt="popup-image"  style={{ width: "580px", height: "auto" }}  />
        {props.children}
        <div className="challenge-buttons">
        <Link to="/profile">
        <button className="challenge-close-btn" onClick={() => props.setTrigger(false)}>
          Back to Profile
        </button>
        </Link>
        <Link to="/challenge">
          <button className="challenge-close-btn" onClick={() => props.setTrigger(false)}>
            Take The Challenge! 🔥
          </button>
        </Link>
        </div>
      </div>
    </div>
    </div>
  ) : (
    ""
  );
}

export default ChallengePopupFunction;
