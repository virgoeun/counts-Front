import { useState, useEffect } from "react";
import axios from "axios";

function LikeStyleButton({ styleId, onUpdateLikeCount}) {
  const [liked, setLiked] = useState(false);
  const storedToken = localStorage.getItem("authToken");

  const API_URL = "http://localhost:5005";

  useEffect(() => {
    // Fetch initial like status when the component mounts
    fetchLikeStatus();
  }, [styleId]);

  const fetchLikeStatus = () => {
    axios
      .get(`${API_URL}/api/style/${styleId}/liked`, {
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


    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };

    if (liked) {
      // If already liked, unlike the style
      requestPromise = axios.delete(
        `${API_URL}/api/style/${styleId}/liked`,
        { headers }
      );
    } else {
      // If not liked, like the style
      requestPromise = axios.post(
        `${API_URL}/api/style/${styleId}/liked`,
        null, // Use null as the request body for a simple POST request
        { headers }
      );
    }

    requestPromise
      .then(() => {
        // Toggle the liked state after successful request
        setLiked(!liked);
        onUpdateLikeCount(styleId, !liked);
      })
      .catch((error) => {
        console.error("Error liking/unliking style:", error);
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

export default LikeStyleButton;
