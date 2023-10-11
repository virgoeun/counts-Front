import { useState, useEffect } from "react";
import axios from "axios";
import ProfileDetails from "../components/ProfileDetails";
import Popup from "../components/ProfilePopup/Popup";
import GetLikedWorkouts from "../components/UserWorkout/GetLikedWorkouts";
import GetLikedStyles from "../components/Style/GetLikedStyles";
import SurveyApp from "../components/SurveyApp";
import Checkin from "./Checkin";
import Video from "../components/Video";
import { Card, Button, Form, FormGroup } from "react-bootstrap";

import Music from "../components/Music";

const API_URL = import.meta.env.VITE_SERVER_URL;

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
      {/* <SurveyApp /> */}
      <Popup />
      <ProfileDetails user={profile} />
      <Music/>
      <div className=""> 
    
      <GetLikedWorkouts user={profile}/>
      </div>
      <div className=""> 
      <GetLikedStyles user={profile} />
      </div>
     
      <div className="service pt-5 pb-5 mb-5"> 
        <Video/>
        </div>
    </div>
  );
}

export default ProfilePage;
