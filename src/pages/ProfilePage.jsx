import { useState, useEffect } from "react";
import axios from "axios";
import ProfileDetails from "../components/ProfileDetails";
import Popup from "../components/ProfilePopup/Popup";
import GetLikedWorkouts from "../components/UserWorkout/GetLikedWorkouts";
import GetLikedStyles from "../components/Style/GetLikedStyles";
import DailyApp from "../components/DailyApp";
const API_URL = "http://localhost:5005";

function ProfilePage() {
  const [profile, setProfile] = useState([]);

  const getProfile = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    console.log("StoredToken", storedToken);

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
  console.log("Profile", profile); //
  return (
    <div className="Profile-details">
     <DailyApp/>
      <ProfileDetails user={profile} />
    
      <GetLikedWorkouts />
      <GetLikedStyles/>
    
      <Popup />
    
      {/* 
      {profile.map((profile, index) => (
        <ProfileCard key={index} {...profile} />
      ))} */}
    </div>
  );
}

export default ProfilePage;
