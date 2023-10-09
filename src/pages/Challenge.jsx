import ChallengePopup from "../components/Challenge/ChallengePopup";
import PlaceDetails from "../components/GoogleApi/PlaceDetails";
import Map from "../components/GoogleApi/Map";
import Popup from "../components/ProfilePopup/Popup";

const API_URL = import.meta.env.VITE_SERVER_URL;

function Challenge() {
  return (
    <div className="google-map-container">
        
      <PlaceDetails />
      <Map />
      {/* <ChallengePopup /> */}

     

    </div>
  );
  x;
}

export default Challenge;
