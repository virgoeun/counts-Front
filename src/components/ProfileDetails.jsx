import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddActivity from "../components/Activity/AddActivity";
import Video from "./Video";

const API_URL = "http://localhost:5005";

function ProfileDetails({ user }) {
  console.log("USERID HERE", user._id);
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
    <div key="profile-card" className="Profile-card">
      <h2>Hello 👋 {user.userName}!</h2>
      <p>Email: {user.email}</p>

      {/* <AddActivity refreshProject={getProfile} /> */}

      {/* <Video /> */}
      <button>
        <Link to="/checkin">Check-in Daily Log 📓</Link>
      </button>
      <button>
        <Link to="/music">Go with Counts Music Flow 🎵 </Link>
      </button>
    
      <button>
        <Link to="/video">Check Count's Snack For You 🍿</Link>
      </button>

      <button>
        <Link to="/challenge">Check This Week's Challenge 🔥 </Link>
      </button>
      <button>
        <Link to="/bookmarks">Check your Faves ✨</Link>
      </button>
      <button>
        <Link to="/style">Check your style FAVs ❤️</Link>
      </button>
      <button>
        <Link to="/workout">Check your workout programs 💪</Link>
      </button>
    </div>
  );
}

export default ProfileDetails;
