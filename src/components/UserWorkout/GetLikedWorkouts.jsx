import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeWorkoutButton from "./LikeWorkoutButton";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

const GetLikedWorkouts = () => {
  const [likedWorkouts, setLikedWorkouts] = useState([]);

  const getLikedWorkoutFunction = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/workout`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Filter the workouts that are liked
        const likedWorkoutstwo = response.data.filter(
          (workout) => workout.likes.length > 0
        );
        setLikedWorkouts(likedWorkoutstwo);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLikedWorkoutFunction();
  }, []);

  return (
    <div>
      
      <h2>Your FAV Workouts:</h2>
      {likedWorkouts.map((workout) => (
        <div key={workout._id} style={{ marginBottom: "20px" }}>
           
          <h3>{workout.title}</h3>
          <img
            src={workout.imageUrl}
            alt={workout.title}
            style={{ width: "300px", height: "390px" }}
          />
          
          <LikeWorkoutButton
            workoutId={workout._id}
            onUpdateLikeCount={() => {
              // Do something when like count is updated
            }}
          />
       <Link to={`/workout/${workout._id}`}>Go to Programm</Link>
        </div>
      ))}
    </div>
  );
};

export default GetLikedWorkouts;
