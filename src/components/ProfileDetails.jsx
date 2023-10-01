import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function ProfileDetails({ user }) {
  return (
    <div key="profile-card" className="Profile-card">
     
      <h2>Welcome, {user.userName}!</h2> {/* Display the user's name */}
      <p>Email: {user.email}</p> {/* Display the user's email */}
      {/* <img src={user.avatar} alt="User Avatar" /> */}
      <button>
        <Link to="/inspiration">Go to Inspiration Page</Link>
      </button>
      <button>
        <Link to="/checkin">Check-in Daily Log</Link>
      </button>
    </div>
  );
}

export default ProfileDetails;
