import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddActivity from "../components/Activity/AddActivity";
import Video from "./Video";
import { Card, Button, Form, FormGroup } from "react-bootstrap";
import Music from "./Music";
import Checkin from "../pages/Checkin";
import Popup from "./ProfilePopup/Popup";

const API_URL = "http://localhost:5005";

function ProfileDetails({ user }) {
  console.log("USERID HERE", user);
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
  console.log("Profile ", profile);

  return (
    <div key="profile-card" className="Profile-card mb-5 mt-5">
    <h2>Hello 👋 {user.userName}!</h2>
    <p>Email: {user.email}</p>
  
    <Checkin />
    <div className="container mb-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 mb-3">
          <Button
            variant="outline-info"
            className="w-100"
            style={{ fontSize: '1.5rem' }}
          >
            <Link to="/challenge" style={{ textDecoration: 'none', color: '#FF1493' }}>This Week's Challenge 🔥</Link>
          </Button>
        </div>
        <div className="col-md-6 mb-3">
          <Button
            variant="outline-info"
            className="w-100"
            style={{ fontSize: '1.5rem' }}
          >
            <Link to="/bookmarks" style={{ textDecoration: 'none', color: '#FF1493' }}>Check your Faves ✨</Link>
          </Button>
        </div>
        <div className="col-md-6 mb-3">
          <Button
            variant="outline-info"
            className="w-100"
            style={{ fontSize: '1.5rem' }}
          >
            <Link to="/style" style={{ textDecoration: 'none', color: '#FF1493' }}>Counts STYLE 👠</Link>
          </Button>
        </div>
        <div className="col-md-6">
          <Button
            variant="outline-info"
            className="w-100"
            style={{ fontSize: '1.5rem' }}
          >
            <Link to="/workout" style={{ textDecoration: 'none', color: '#FF1493' }}>Counts MOVE 💪</Link>
          </Button>




        {/* <div className="col-md-4"> 
      <Button variant="outline-info" className="m-2" style={{ width: '100%' }}>
        <Link to="/checkin" style={{ textDecoration: 'none', color: '#FF1493' }}> Log Your Move 📓</Link>
      </Button>
     </div> */}
 
      {/* <div className="col-md-4"> 
      <Button variant="outline-info" className="m-2"style={{ width: '100%' }}>
        <Link to="/music" style={{ textDecoration: 'none', color: '#FF1493' }}> Counts Music Flow 🎵 </Link>
      </Button>
      </div>
     */}
      {/* <Button variant="outline-info"className="m-2">
        <Link to="/video" style={{ textDecoration: 'none', color: '#FF1493' }}> Count's Snack For You 🍿</Link>
      </Button> */}
</div>

        </div>
        </div>
  
    </div>
  );
}

export default ProfileDetails;
