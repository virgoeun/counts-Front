import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AdminWorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const storedToken = localStorage.getItem("authToken");


  useEffect(() => {
    // Fetch the workout data from the server
    axios
      .get(`${API_URL}/api/admin-workout`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setWorkouts(response.data);
        console.log("RES", response.data)
      })
      .catch((error) => {
        console.error("Error fetching workout data:", error);
      });
  }, []); // The empty dependency array ensures the effect runs once, like componentDidMount

  return (
    <div>
      <h2>Admin Workout List</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <h3>{workout.title}</h3>
            <p>Workout Number: {workout.workoutNumber}</p>
            <p>Description: {workout.description}</p>
            {workout.imageUrl && (
              <img src={workout.imageUrl} alt={workout.title} width="300" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminWorkoutList;