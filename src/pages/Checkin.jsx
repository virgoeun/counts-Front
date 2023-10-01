// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// import ProfileDetails from "../components/ProfileDetails";
// // import AddProject from "../components/AddProject";
// //import ProfileCard from "../components/ProfileCard";
// import DailyApp from "../components/DailyApp";
// import AddActivity from "../components/addActivity";

// const API_URL = "http://localhost:5005";

// function Checkin({ _id, date, sleep, water, stress, sports, note }) {
//   const [checkin, setCheckin] = useState([]);

//   const { activityId } = useParams();   

//   const getProfile = () => {
//     // Get the token from the localStorage
//     const storedToken = localStorage.getItem("authToken");
//     console.log("StoredToken", storedToken);

//     // Send the token through the request "Authorization" Headers
//     axios
//       .get(`${API_URL}/api/checkin`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => setCheckin(response.data))
//       .catch((error) => console.log(error));
//   };

//   // We set this effect will run only once, after the initial render
//   // by setting the empty dependency array - []
//   useEffect(() => {
//     getProfile();
//   }, []);
//   console.log(checkin);
//   return (
//     <div className="checkin-details">
//       {checkin &&
//         checkin.map((data, index) => (
//           <div key={index + data._id}>
//             <ul>
//               <li>Date: {data.date}</li>
//               <li>Stress: {data.stress}</li>
//               <li>Hydration: {data.water}</li>
//               <li>Sleep: {data.sleep}</li>
//               <li style={{ maxWidth: "400px" }}>Note: {data.note}</li>
//             </ul>
//           </div>
//         ))}

//       <div>
//         sports:
//         {checkin.map((data, index) => (
//           <div key={index}>
//             <ul>
//               {/* Access sports property for each data item */}
//               {data.sports.map((sport, sportIndex) => (
//                 <li key={sportIndex}>
//                   Type: {sport.type}
//                   <br />
//                   Description: {sport.description}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       <AddActivity refreshProject={getProfile} activityId={activityId} />
//       <Link to="/checkin">
//         <button>Back to all Activities</button>
//       </Link>

//       <Link to="/checkin">
//         <button>Add new Activities</button>
//       </Link>

//       <Link to={`/checkin/edit/${activityId}`}>
//         <button>Edit Project</button>
//       </Link>
//     </div>
//   );
// }

// export default Checkin;


import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProfileDetails from "../components/ProfileDetails";
// import AddProject from "../components/AddProject";
//import ProfileCard from "../components/ProfileCard";
import AddActivity from "../components/addActivity";

const API_URL = "http://localhost:5005";

function Checkin({ _id, date, sleep, water, stress, sports, note }) {
  const [checkin, setCheckin] = useState([]);

  const getProfile = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    console.log("StoredToken", storedToken);

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/checkin`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setCheckin(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getProfile();
  }, []);
  console.log(checkin);
  return (
    <div className="checkin-details">
     
      {checkin.map((activity, index) => {
        return (
          <div className="ProjectCard card" key={activity._id} >
            <Link to={`/checkin/${activity._id}`}>
              <h3>Acitivy {index+1}</h3>
            </Link>
          </div>
        );
      })}     

      <AddActivity refreshProject={getProfile} />
      {/* <Link to="/checkin">
        <button>Back to all Activities</button>
      </Link>

      <Link to="/checkin">
        <button>Add new Activities</button>
      </Link>

      <Link to={`/checkin/edit/${activityId}`}>
        <button>Edit Project</button>
      </Link> */}
    </div>
  );
}

export default Checkin;
