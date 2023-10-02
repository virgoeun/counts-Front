import React from "react";
import { Link } from "react-router-dom";

function PopupFunction(props) {
  
  return props.trigger ? (
    <div className="popup-outer">
      <div className="popup-inner">
        {props.children}
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          Back to Profile
        </button>
        <Link to="/challenge">
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            Unlock Challenge!
          </button>
        </Link>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupFunction;
