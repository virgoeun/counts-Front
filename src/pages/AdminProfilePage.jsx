import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProfileDetails from "../components/ProfileDetails";
import GeocodeForm from "../components/GoogleApi/Geocoder";
import AddAmindWorkout from "../components/AdminWorkout/AddAdminWorkout";

const API_URL = "http://localhost:5005";

function AdminProfilePage() {
  const [adminProfile, setAdminProfile] = useState([]);

  const getAdminProfile = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    console.log("StoredToken", storedToken);

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAdminProfile(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAdminProfile();
  }, []);
  console.log("Profile", adminProfile); //
  return (
    <div className="Admin-profile-details">
      {/* <ProfileDetails user={adminProfile} /> */}
      <h2>Hello 👋 {adminProfile.userName}!</h2> {/* Display the user's name */}
      <p>Email: {adminProfile.email}</p> {/* Display the user's email */}
      <div className="geocode-container">    <GeocodeForm/></div>
      <Link to="/admin-workout">
        <button className="">Workout Program Management Page 💻</button>
      </Link>
      
    </div>
  );
}

export default AdminProfilePage;
