import React, { useState } from "react";
import axios from "axios";

function GeocodeForm() {
  const [address, setAddress] = useState("");
  const [geocodeResult, setGeocodeResult] = useState(null);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const storedToken = localStorage.getItem("authToken");
  const API_URL = "https://counts-back.onrender.com"; // Define your API URL here

  const handleGeocodeClick = () => {
    // Make an axios GET request to your backend endpoint for geocoding
    axios
      .get(`${API_URL}/api/geocode`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        params: { address },
      })
      .then((response) => {
        setGeocodeResult(response.data);
      })
      .catch((error) => {
        console.error("Error fetching geocode data:", error);
      });
  };

  return (
    <div>
      <h2>Geocode Address</h2>
      <input
        type="text"
        placeholder="Enter an address"
        value={address}
        onChange={handleAddressChange}
      />
      <button onClick={handleGeocodeClick}>Geocode</button>
      {geocodeResult && (
        <div>
          <h3>Geocode Result</h3>
          <p>Latitude: {geocodeResult.latitude}</p>
          <p>Longitude: {geocodeResult.longitude}</p>
        </div>
      )}
    </div>
  );
}

export default GeocodeForm;
