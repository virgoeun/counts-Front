import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LikeWorkoutButton from "../UserWorkout/LikeWorkoutButton";
import HeartButton from "../HeartButton";

const API_URL = "http://localhost:5005";

function EachWorkout() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch the workout data from the server
    axios
      .get(`${API_URL}/api/workout/${workoutId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setWorkout(response.data);
        console.log("GET Workout Response", response.data);
      })
      .catch((error) => {
        console.error("Error fetching workout data:", error);
      });
  }, [workoutId]); // Fetch data whenever workoutId changes

  const updateLikeCount = (liked) => {
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      likeCount: liked ? prevWorkout.likeCount + 1 : prevWorkout.likeCount - 1,
    }));
  };

  return (
    <div>
      {workout ? (
        <>
          <h2>Workout</h2>
          <h3>{workout.title}</h3>
          {workout.imageUrl && (
            <img src={workout.imageUrl} alt={workout.title} width="300" />
          )}
          <LikeWorkoutButton workoutId={workout._id} onUpdateLikeCount={updateLikeCount} />
          <span>Likes: {workout.likeCount}</span>
          <p>Description: {workout.description}</p>
        </>
      ) : (
        <p>Loading workout...</p>
      )}
    </div>
  );
}

export default EachWorkout;