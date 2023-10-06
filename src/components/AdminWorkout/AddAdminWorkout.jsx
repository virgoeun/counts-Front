import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminWorkoutList from "./AdminWorkoutList";

const API_URL = "https://counts-back.onrender.com";
const storedToken = localStorage.getItem("authToken");

function AddAmindWorkout({ refreshWorkouts }) {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState("null");
  const [imageUrl, setImageUrl] = useState(""); 


  const [workoutData, setWorkoutData] = useState({
    workoutNumber: "",
    title: "",
    description: "",
    imageUrl: "",
  });
  console.log("workoutdata", workoutData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({
      ...workoutData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("workoutNumber", workoutData.workoutNumber);
    formData.append("title", workoutData.title);
    formData.append("description", workoutData.description);
    formData.append("imageFile", imageFile); // Add the image file to the FormData

    axios
      .post(`${API_URL}/api/admin-workout`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setWorkoutData({
            workoutNumber: "",
            title: "",
            description: "",
            imageUrl: "",
          });
          refreshWorkouts();
          navigate("/admin-profile");
        } else {
          console.error("Failed to create workout");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div>
      <h2>Create a New Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="workoutNumber">Workout Number</label>
          <input
            type="number"
            id="workoutNumber"
            name="workoutNumber"
            value={workoutData.workoutNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={workoutData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={workoutData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*" // Specify accepted file types
            onChange={handleImageChange}
          />
        </div>
        <div>
          <button type="submit">Create Workout</button>
        </div>
      </form>

       {/* Display the uploaded image */}
       {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageFile} alt="Uploaded Workout" width="300" />
        </div>
      )}
      <AdminWorkoutList />
    </div>
  );
}

export default AddAmindWorkout;
