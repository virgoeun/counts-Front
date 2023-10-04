import React, { useState, useEffect } from "react";
import axios from "axios";
import LikedStyleButton from "./LikeStyleButton";

const API_URL = "http://localhost:5005";

const GetLikedStyles = () => {
  const [likedStyles, setLikedStyles] = useState([]);

  const getLikedStyleFunction = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/style`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
    
        const likedStylestwo = response.data.filter(
          (style) => style.likes.length > 0
        );
        setLikedStyles(likedStylestwo);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLikedStyleFunction();
  }, []);

  return (
    <div>
      <h2>Your FAV Styles:</h2>
      {likedStyles.map((style) => (
        <div key={style._id} style={{ marginBottom: "20px" }}>
          <h3>{style.title}</h3>
          <img
            src={style.imageUrl}
            alt={style.title}
            style={{ width: "300px", height: "450px" }}
          />
          <LikedStyleButton
            styleId={style._id}
            onUpdateLikeCount={() => {
              // Do something when like count is updated
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default GetLikedStyles;
