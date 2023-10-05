import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LikeWorkoutButton from "../UserWorkout/LikeWorkoutButton";
import { Link } from "react-router-dom";

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


  return (
    <div>
      {style ? (
        <>
          <h2>Style</h2>
          <h3>{style.title}</h3>
          {style.imageUrl && (
            <img src={style.imageUrl} alt={style.title} width="300" />
          )}
        
          <p>Description: {style.description}</p>
          <h3>Price: 48€</h3>
          <Link to="/joke" > 
                <button
                  style={{
                    marginTop: "0px",
                    padding: "3px 9px",
                    cursor: "pointer",
                    backgroundColor: "Pink",
                    color: "black",
                    fontWeight:"bold",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "12px",
                  }}
                  // onClick={() => window.location.href = 'https://www.aloyoga.com/products/m3193r-conquer-1-4-zip-reform-long-sleeve-navy'}
                >
                  
                  Add to Cart
                </button>
                </Link>
        </>
      ) : (
        <p>Loading style...</p>
      )}
    </div>
  );
}

export default EachStyle;