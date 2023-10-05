// import React from "react";
// import { Link } from "react-router-dom";

// function PopupFunction(props) {
  
//   return props.trigger ? (
//     <div className="popup-outer">
//       <div className="popup-inner">
//         {props.children}
//         <Link to="/profile">
//         <button className="close-btn" onClick={() => props.setTrigger(false)}>
//           Back to Profile
//         </button>
//         </Link>
//         <Link to="/challenge">
//           <button className="close-btn" onClick={() => props.setTrigger(false)}>
//             Unlock Challenge!
//           </button>
//         </Link>
//       </div>
//     </div>
//   ) : (
//     ""
//   );
// }

// export default PopupFunction;


import React from "react";
import { Link } from "react-router-dom";
import {Stack, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PopupFunction = (props) => {
  return props.trigger ? (
    <div className="popup-outer">
      <div className="popup-inner">
        <img src={props.imgSrc} alt="Popup Image" />
        {props.children}
        <div className="d-flex justify-content-center">
        <Stack direction="horizontal" gap={3}> 
        <Link to="/profile">
        <Button variant="light" className="p-2 ms-auto" onClick={() => props.setTrigger(false)} >
            Back to Profile
          </Button>
        </Link>
        <Link to="/challenge">
        <Button variant="warning" className="p-2 ms-auto" onClick={() => props.setTrigger(false)} >
            Unlock Your Challenge 🔓
          </Button>
        </Link>
        </Stack>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopupFunction;
