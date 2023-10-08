import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    getAdminProfile();

    if (user && user.email.includes("admin")) {
      navigate("/admin-profile");
    }
  }, [user, navigate]);
  console.log("Profile", adminProfile); //
  return (
    <div className="Admin-profile-details mb-5 mt-5">
      <h2 className="mt-5 mb-5">Hello 👋 {adminProfile.userName}!</h2>
      <p className="mt-5 mb-5">Email: {adminProfile.email}</p>
      <div className="geocode-container">
        <GeocodeForm />
      </div>
      <Link to="/admin-workout">
        <button className="">Workout Program Management Page 💻</button>
      </Link>
      <Link to="/admin-style">
        <button className="">Style Management Page 👠</button>
      </Link>
    </div>
  );
}

export default AdminProfilePage;
