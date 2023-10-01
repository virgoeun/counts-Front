import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import ProfileDetails from "../components/ProfileDetails";
// import AddProject from "../components/AddProject";
//import ProfileCard from "../components/ProfileCard";
import AddActivity from "../components/addActivity";

const API_URL = "http://localhost:5005";
//function Checkin() {{ _id, date, sleep, water, stress, sports, note }...
function Checkin({id}) {
const [checkin, setCheckin] = useState([]);
const userId = id;
  // console.log("please", userId) // I got the ID but...

  const getActivity = () => {
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
    getActivity();
  }, []);
  console.log(checkin); 
  return (
    <div className="checkin-details">
      {checkin.map((activity, index) => {
        return (
          <div className="Activity-card" key={activity._id}>
            <Link to={`/checkin/${activity._id}`}>
              <h3>Acitivy {index + 1}</h3>
            </Link>
          </div>
        );
      })}

{/* <AddActivity refreshProject={getActivity} userId={userId} />
     */}


    </div>
    
  );
}

export default Checkin;
