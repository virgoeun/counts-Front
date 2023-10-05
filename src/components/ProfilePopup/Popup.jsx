import React from "react";
import PopupFunction from "./PopupFunction";
import "./Popup.css";
import { useState, useEffect } from "react";
import popupImage from "../../assets/hearts/heart-black.png";

export default function Popup() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
      localStorage.setItem("popupShown", "true");
    }, 10000); //edit it later!
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

        <PopupFunction trigger={timedPopup} setTrigger={setTimedPopup} imgSrc={popupImage}>
        <h3 className="mt-3 mb-3">My Second try Popup</h3>
         
        </PopupFunction>
      </main>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import PopupFunction from "./PopupFunction";
// import "./Popup.css";

// export default function Popup() {
//   const [timedPopup, setTimedPopup] = useState(false);

//   useEffect(() => {
//     const popupShown = localStorage.getItem("popupShown");
//     if (!popupShown) {
//       setTimeout(() => {
//         setTimedPopup(true);
//         localStorage.setItem("popupShown", "true");
//       }, 3000);
//     }
//   }, []);

//   return (
//     <div className="popup">
//       <main>
//         <h1>Popup</h1>
//         <br />
//         {timedPopup ? (
//           <PopupFunction trigger={timedPopup} setTrigger={setTimedPopup}>
//             <h3>My Second try Popup</h3>
//             <p>This is my Timed popup!</p>
//           </PopupFunction>
//         ) : (
//           <button disabled>Popup will appear in 3 seconds</button>
//         )}
//       </main>
//     </div>
//   );
// }
