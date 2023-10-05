import { useState, useEffect } from "react";
import axios from "axios";
import ProfileDetails from "../components/ProfileDetails";
import Popup from "../components/ProfilePopup/Popup";
import GetLikedWorkouts from "../components/UserWorkout/GetLikedWorkouts";
import GetLikedStyles from "../components/Style/GetLikedStyles";
import SurveyApp from "../components/SurveyApp";
import Checkin from "./Checkin";

const API_URL = "http://localhost:5005";

function ProfilePage() {
  const [profile, setProfile] = useState([]);

  const getProfile = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log("StoredToken", storedToken);

    axios
      .get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfile();
  }, []);
  console.log("Profile", profile); //
  return (
    <div className="font-face-gm">
      {/* <SurveyApp />
      <Popup /> */}
      <ProfileDetails user={profile} />
      <GetLikedWorkouts />
      <GetLikedStyles />
      <Checkin/>
     
    </div>
  );
}

export default ProfilePage;
