import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import LikeWorkoutButton from "../UserWorkout/LikeWorkoutButton";

const API_URL = import.meta.env.VITE_SERVER_URL;

function AdminWorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const storedToken = localStorage.getItem("authToken");


  useEffect(() => {
    // Fetch the workout data from the server
    axios
      .get(`${API_URL}/api/admin-workout`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setWorkouts(response.data);
        console.log("GET Workout Resonpse", response.data)
      })
      .catch((error) => {
        console.error("Error fetching workout data:", error);
      });
  }, []); // The empty dependency array ensures the effect runs once, like componentDidMount

  const updateLikeCount = (workoutId, liked) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout._id === workoutId // If the IDs don't match, it leaves the workout unchanged.
          ? { ...workout, likeCount: liked ? workout.likeCount + 1 : workout.likeCount - 1 }
          : workout
      )
    );
  };


  return (
    <div>
      <h2>Workout List</h2>
      {workouts.map((workout) => (
        <div key={workout._id} style={{ marginBottom: "20px" }}>
          <Card style={{ width: "100%" }}>
            <Card.Header>
              <Card.Title style={{ backgroundColor: "#FF1493", color: "white" }}>{workout.title}</Card.Title>
            </Card.Header>
            <Card.Body>
              {workout.imageUrl && (
                <Card.Img
                  src={workout.imageUrl}
                  alt={workout.title}
                  style={{ width: "70%", height: "400px", objectFit: "cover" }}
                />
              )}
              <LikeWorkoutButton workoutId={workout._id} onUpdateLikeCount={updateLikeCount} />
              <span>Likes: {workout.likeCount}</span>
              <p
              style={{
                maxWidth: "440px",
                textAlign: "center",
                color: "#808080",
              }}
              className="mb-3"
            >Description: {workout.description}</p>
              <Link to={`/workout/${workout._id}`}>
                <Button variant="outline-primary">View Workout</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default AdminWorkoutList;


