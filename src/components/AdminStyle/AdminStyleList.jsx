import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LikeStyleButton from "../Style/LikeStyleButton";

const API_URL = "http://localhost:5005";

function AdminStyleList() {
  const [styles, setStyles] = useState([]);
  const storedToken = localStorage.getItem("authToken");


  useEffect(() => {
    axios
      .get(`${API_URL}/api/admin-style`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setStyles(response.data);
        console.log("GET Style Resonpse", response.data)
      })
      .catch((error) => {
        console.error("Error fetching Style data:", error);
      });
  }, []); // The empty dependency array ensures the effect runs once, like componentDidMount

  const updateLikeCount = (styleId, liked) => {
    setStyles((prevStyles) =>
    prevStyles.map((style) =>
        style._id === styleId
          ? { ...style, likeCount: liked ? style.likeCount + 1 : style.likeCount - 1 }
          : style
      )
    );
  };


  return (
    <div> 
      <h2> Style List</h2>
      <ul>
        {styles.map((style) => (
          <li key={style._id}>
            <h3>{style.title}</h3>
            {style.imageUrl && (
              <img src={style.imageUrl} alt={style.title} width="300" />
            )}
            <LikeStyleButton styleId={style._id} onUpdateLikeCount={updateLikeCount} />
            <span> Likes: {style.likeCount}</span>
        
            <p>Description: {style.description}</p>
           
          </li>
        ))}
      </ul>
     
    </div>
  );
}

export default AdminStyleList;