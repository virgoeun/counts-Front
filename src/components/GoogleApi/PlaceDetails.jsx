import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

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
      {/* <h1>Place Details</h1> */}
      {place ? (
        <div>
          <h2 className="mt-5 mb-5" style={{ color: 'green' }}>{place.name} X Counts Collaboration 💚</h2>
          <p style={{ fontSize: '20px' }}>Rating: {place.rating} ⭐️⭐️⭐️⭐️</p>
          {/* <p>Phone: {place.formatted_phone_number}</p> */}
        </div>
      ) : (
        <p>Loading place details...</p>
      )}
    </div>
  );
}

export default PlaceDetails;

