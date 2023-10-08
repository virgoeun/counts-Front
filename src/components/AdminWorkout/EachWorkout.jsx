import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 className="mt-5">Workout</h2>
          <h3>{workout.title}</h3>
          {workout.imageUrl && (
            <img
              src={workout.imageUrl}
              alt={workout.title}
              width="300"
              className="mb-3"
            />
          )}
          <p
            style={{ maxWidth: "440px", textAlign: "center", color: "#808080" }}
            className="mb-3"
          >
            Description: {workout.description}
          </p>
          <h3>Price: 25.55€</h3>
          <Link to="/joke" target="_blank">
            <button
              style={{
                marginTop: "10px",

                padding: "12px 25px",
                cursor: "pointer",
                backgroundColor: "Pink",
                color: "black",
                fontWeight: "bold",
                border: "none",
                borderRadius: "5px",
                fontSize: "22px",
              }}
            >
              Add to Cart
            </button>
          </Link>
          <Link to="/workout">
            <Button variant="link" id="backtostyle-btn" className="mt-2">
              Back to Workout List
            </Button>
          </Link>
        </div>
      ) : (
        <p>Loading workout...</p>
      )}
    </div>
  );
}

export default EachWorkout;
