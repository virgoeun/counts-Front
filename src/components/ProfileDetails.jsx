import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Checkin from "../pages/Checkin";
import AddActivity from "./addActivity";
import Chart from "../pages/Chart";

const API_URL = "http://localhost:5005";

function ProfileDetails({ user }) {
    console.log("USERID HERE", user._id)
    const [profile, setProfile] = useState([]);

    const getProfile = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
      console.log("StoredToken", storedToken)
  
      // Send the token through the request "Authorization" Headers
      axios
        .get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => setProfile(response.data))
        .catch((error) => console.log(error));
    };
  
    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
      getProfile();
    }, []);
    console.log("Profile ", profile);

  return (
    <div key="profile-card" className="Profile-card">
     
      <h2>Welcome, {user.userName}!</h2> {/* Display the user's name */}
      <p>Email: {user.email}</p> {/* Display the user's email */}
      {/* <img src={user.avatar} alt="User Avatar" /> */}

<AddActivity refreshProject={getProfile}  />
{/* userId={user._id} */}
{/*  */}

      <button>
        <Link to="/music">Go with Counts Music Flow 🎵 </Link>
      </button>
      <button>
        <Link to="/video">Check Count's Snack For You 🍿</Link>
      </button>
      <button>
        <Link to="/checkin">Check-in Daily Log 📓</Link>
      </button>

      <button>
        <Link to="/challenge">Unlock Today's Challenge!🔥</Link>
      </button>

    </div>
  );
}

export default ProfileDetails;
