import { useState, useEffect } from "react";
import axios from "axios";

function LikeWorkoutButton({ workoutId }) {
  const [liked, setLiked] = useState(false);



  useEffect(() => {
    // Fetch initial like status when the component mounts
    fetchLikeStatus();
  }, [workoutId]);

  const fetchLikeStatus = () => {


    axios
      .get(`/api/workouts/${workoutId}/liked`)
      .then((response) => {
        setLiked(response.data.liked);
      })
      .catch((error) => {
        console.error("Error fetching like status:", error);
      });
  };

  const handleLikeClick = () => {
    let requestPromise;

    if (liked) {
      // If already liked, unlike the workout
      requestPromise = axios.delete(`/api/workouts/${workoutId}/liked`);
    } else {
      // If not liked, like the workout
      requestPromise = axios.post(`/api/workouts/${workoutId}/liked`);
    }

    requestPromise
      .then(() => {
        // Toggle the liked state after successful request
        setLiked(!liked);
      })
      .catch((error) => {
        console.error("Error liking/unliking workout:", error);
      });
  };

  return (
    <div>
      <button onClick={handleLikeClick}>
        {liked ? "Unlike" : "Like"} Workout
      </button>
    </div>
  );
}

export default LikeWorkoutButton;
