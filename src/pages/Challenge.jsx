import { useState, useEffect } from "react";
import axios from "axios";
import ProfileDetails from "../components/ProfileDetails";
import Popup from "../components/Popup/Popup";
import PlaceDetails from "../components/GoogleApi/PlaceDetails";
import Map from "../components/GoogleApi/Map";

const API_URL = "http://localhost:5005";

function Challenge() {


  return (
    <div className="google-map-container">
      <PlaceDetails />
      <Map/>
    </div>
  );x
}

export default Challenge;
