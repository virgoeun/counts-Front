import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddAmindWorkout from "../components/AdminWorkout/AddAdminWorkout";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AdminWorkoutPage() {
  const [admindWorkouts, setAdminWorkouts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getAdminWorkouts = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/admin-workout`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAdminWorkouts(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAdminWorkouts();

    if (user && user.email.includes("admin")) {
      // User is an admin, do nothing (continue rendering the component)
    } else {
      // Redirect non-admin users to a specific page
      navigate("/");
    }
  }, [user, navigate]);
  console.log(user);

  return (
    <>
      {" "}
      <AddAmindWorkout refreshWorkouts={getAdminWorkouts} />
      {/* <button onClick={() => navigate('/bookmarks')}>Go to Bookmarks</button> */}
    </>
  );
}

export default AdminWorkoutPage;
