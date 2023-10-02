import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function PlaceDetails() {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    // Make a GET request to your backend API
    axios
      .get(`${API_URL}/api/challenge`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPlace(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching place details:", error);
      });
  }, []); // The empty dependency array ensures that the effect runs only once

  return (
    <div>
      <h1>Place Details</h1>
      {place ? (
        <div>
          <h2>{place.name}</h2>
          <p>Rating: {place.rating}</p>
          <p>Phone: {place.formatted_phone_number}</p>
        </div>
      ) : (
        <p>Loading place details...</p>
      )}
    </div>
  );
}

export default PlaceDetails;

