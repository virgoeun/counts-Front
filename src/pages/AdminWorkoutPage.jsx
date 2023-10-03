import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AddAmindWorkout from "../components/AdminWorkout/AddAdminWorkout";

const API_URL = 'http://localhost:5005';

function AdminWorkoutPage() {
    const navigate = useNavigate();
    const [admindWorkouts, setAdminWorkouts] = useState([]);
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
    
      // We set this effect will run only once, after the initial render
      // by setting the empty dependency array - []
      useEffect(() => {
        getAdminWorkouts();
      }, []);
      console.log("AdminWorkouts ", admindWorkouts);
    return (
        <> <AddAmindWorkout refreshWorkouts={getAdminWorkouts}/>
         {/* <button onClick={() => navigate('/bookmarks')}>Go to Bookmarks</button> */}
        </>


    )
  };

 

export default AdminWorkoutPage;


