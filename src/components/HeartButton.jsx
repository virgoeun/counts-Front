import React, { useState } from "react";

const HeartButton = ({ workoutId, onUpdateLikeCount }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    // Toggle the liked state
    setLiked(!liked);

    // Update the like count
    onUpdateLikeCount(workoutId, !liked);
  };

  return (
    <button
      onClick={handleLikeClick}
      style={{ color: liked ? "red" : "black", cursor: "pointer" }}
    >
      ❤️
    </button>
  );
};

export default HeartButton;
