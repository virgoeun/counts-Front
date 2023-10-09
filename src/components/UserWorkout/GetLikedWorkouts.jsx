import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeWorkoutButton from "./LikeWorkoutButton";
import { Link } from "react-router-dom";

import { Card, Button } from "react-bootstrap";

const API_URL = import.meta.env.VITE_SERVER_URL;

const GetLikedWorkouts = () => {
  const [likedWorkouts, setLikedWorkouts] = useState([]);

  const getLikedWorkoutFunction = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/workout`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Filter the workouts that are liked
        const likedWorkoutstwo = response.data.filter(
          (workout) => workout.likes.length > 0
        );
        setLikedWorkouts(likedWorkoutstwo);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLikedWorkoutFunction();
  }, []);

  return (
    <div>
      <h1 className="mt-5 mb-5">Your  ❤️ Workouts:</h1>
      <div
        className="card-container d-flex flex-wrap justify-content-center align-items-center"
        style={{ gap: "40px" }}
      >
        {likedWorkouts.map((workout) => (
          <Card
            key={workout._id}
            className="" style={{ marginBottom: "20px", width: "300px" }}
          >
            <Card.Header>
              <Card.Title className="text-danger" style={{ fontSize: "1em" }}>
                {workout.title}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Img
                src={workout.imageUrl}
                alt={workout.title}
                style={{ width: "100%", height: "230px", objectFit: "cover" }}
              />
              <LikeWorkoutButton
                workoutId={workout._id}
                onUpdateLikeCount={() => {}}
              />
              <Link to={`/workout/${workout._id}`} className="text-info">
                <Button variant="outline-danger">Go to Program</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GetLikedWorkouts;
