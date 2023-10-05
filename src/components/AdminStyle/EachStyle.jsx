import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LikeWorkoutButton from "../UserWorkout/LikeWorkoutButton";
import HeartButton from "../HeartButton";

const API_URL = "http://localhost:5005";

function EachStyle() {
  const { styleId } = useParams();
  const [style, setStyle] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch the workout data from the server
    axios
      .get(`${API_URL}/api/style/${styleId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setStyle(response.data);
        console.log("GET Workout Response", response.data);
      })
      .catch((error) => {
        console.error("Error fetching workout data:", error);
      });
  }, [styleId]); // Fetch data whenever workoutId changes

  const updateLikeCount = (liked) => {
    setWorkout((prevStyle) => ({
      ...prevStyle,
      likeCount: liked ? prevStyle.likeCount + 1 : prevStyle.likeCount - 1,
    }));
  };

  return (
    <div>
      {style ? (
        <>
          <h2>Style</h2>
          <h3>{style.title}</h3>
          {style.imageUrl && (
            <img src={style.imageUrl} alt={style.title} width="300" />
          )}
          <LikeWorkoutButton styleId={style._id} onUpdateLikeCount={updateLikeCount} />
          <span>Likes: {style.likeCount}</span>
          <p>Description: {style.description}</p>
        </>
      ) : (
        <p>Loading style...</p>
      )}
    </div>
  );
}

export default EachStyle;