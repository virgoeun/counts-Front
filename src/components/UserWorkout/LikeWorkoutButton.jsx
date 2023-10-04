import { useState, useEffect } from "react";
import axios from "axios";

function LikeWorkoutButton({ workoutId, onUpdateLikeCount}) {
  const [liked, setLiked] = useState(false);
  const storedToken = localStorage.getItem("authToken");

  const API_URL = "http://localhost:5005";

  useEffect(() => {
    // Fetch initial like status when the component mounts
    fetchLikeStatus();
  }, [workoutId]);

  const fetchLikeStatus = () => {
    axios
      .get(`${API_URL}/api/workout/${workoutId}/liked`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setLiked(response.data.liked);
      })
      .catch((error) => {
        console.error("Error fetching like status:", error);
      });
  };

  const handleLikeClick = () => {
    let requestPromise;

    //without requestPromise...
    // axios.post(
    //     `${API_URL}/api/workouts/${workoutId}/liked`,
    //     null, // Use null as the request body for a simple POST request
    //     { headers }
    //   )
    //     .then(() => {
    //       // Toggle the liked state after successful request
    //       setLiked(!liked);
    //     })
    //     .catch((error) => {
    //       console.error("Error liking/unliking workout:", error);
    //     });

    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };

    if (liked) {
      // If already liked, unlike the workout
      requestPromise = axios.delete(
        `${API_URL}/api/workout/${workoutId}/liked`,
        { headers }
      );
    } else {
      // If not liked, like the workout
      requestPromise = axios.post(
        `${API_URL}/api/workout/${workoutId}/liked`,
        null, // Use null as the request body for a simple POST request
        { headers }
      );
    }

    requestPromise
      .then(() => {
        // Toggle the liked state after successful request
        setLiked(!liked);
        onUpdateLikeCount(workoutId, !liked);
        fetchLikeStatus();//make sure the state change->rerender
      })
      .catch((error) => {
        console.error("Error liking/unliking workout:", error);
      });
  };

  return (
    <div>
       <button onClick={handleLikeClick}>
        {liked ? "❤️" : "🤍"} Workout
      </button>
    </div>
  );
}

export default LikeWorkoutButton;
