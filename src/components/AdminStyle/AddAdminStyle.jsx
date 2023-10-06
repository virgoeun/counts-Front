import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminStyleList from "./AdminStyleList";


const API_URL = "https://counts-back.onrender.com";

const storedToken = localStorage.getItem("authToken");

function AddAmindStyle({ refreshStyles }) {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState("null");
  const [imageUrl, setImageUrl] = useState(""); 


  const [styleData, setStyleData] = useState({
    styleNumber: "",
    title: "",
    description: "",
    imageUrl: "",
  });
  console.log("styleData", styleData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStyleData({
      ...styleData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("styleNumber", styleData.styleNumber);
    formData.append("title", styleData.title);
    formData.append("description", styleData.description);
    formData.append("imageFile", imageFile); // Add the image file to the FormData

    axios
      .post(`${API_URL}/api/admin-style`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setStyleData({
            styleNumber: "",
            title: "",
            description: "",
            imageUrl: "",
          });
          refreshStyles();
          navigate("/admin-style");
        } else {
          console.error("Failed to create Style");
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
      <h2>Create a New Style</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="styleNumber">Style Number</label>
          <input
            type="number"
            id="styleNumber"
            name="styleNumber"
            value={styleData.styleNumber}
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
            value={styleData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={styleData.description}
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
          <button type="submit">Create Style</button>
        </div>
      </form>

       {/* Display the uploaded image */}
       {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageFile} alt="Uploaded Style" width="300" />
        </div>
      )}
      <AdminStyleList />
    </div>
  );
}

export default AddAmindStyle;