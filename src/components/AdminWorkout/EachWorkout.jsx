import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

 

  return (
    <div>
      {workout ? (
        <>
          <h2>Workout</h2>
          <h3>{workout.title}</h3>
          {workout.imageUrl && (
            <img src={workout.imageUrl} alt={workout.title} width="300" />
          )}
        
    
          <p>Description: {workout.description}</p>
          <h3>Price: 25.55€</h3>
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
        <p>Loading workout...</p>
      )}
    </div>
  );
}

export default EachWorkout;