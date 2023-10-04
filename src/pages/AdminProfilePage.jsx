import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import GeocodeForm from "../components/GoogleApi/Geocoder";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AdminProfilePage() {
  const [adminProfile, setAdminProfile] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getAdminProfile = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    console.log("StoredToken", storedToken);

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/admin-profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAdminProfile(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    // Call the function to get admin profile when the component mounts
    getAdminProfile();
    
    if (user && user.email.includes('admin')) {
      // Redirect non-admin users to a specific page
      navigate("/admin-profile");
    }
  }, [user, navigate]);
  console.log("Profile", adminProfile); //
  return (
    <div className="Admin-profile-details">
      <h2>Hello 👋 {adminProfile.userName}!</h2>
      <p>Email: {adminProfile.email}</p>
      <div className="geocode-container">
        <GeocodeForm />
      </div>
      <Link to="/admin-workout">
        <button className="">Workout Program Management Page 💻</button>
      </Link>
    </div>
  );
}

export default AdminProfilePage;
