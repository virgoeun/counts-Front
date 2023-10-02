import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ActivityDetails from "./components/ActivityDetails";
import Music from "./components/Music";
import Video from "./components/Video";
import Challenge from "./pages/Challenge";
import Chart from "./pages/Chart";
import DailyApp from "./components/DailyApp";
import GeocodeForm from "./components/GoogleApi/Geocoder";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Checkin from "./pages/Checkin";
import EditCheckin from "./pages/EditCheckin";
import PlaceDetails from "./components/GoogleApi/PlaceDetails";


function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/checkin"
          element={
            <IsPrivate>
              <Checkin />
            </IsPrivate>
          }
        />

<Route
          path="/geocode"
          element={
            <IsPrivate>
              <GeocodeForm />
            </IsPrivate>
          }
        />

<Route
          path="/challenge"
          element={
            <IsPrivate>
              <Challenge />
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/challenge"
          element={
            <IsPrivate>
              <Challenge />
            </IsPrivate>
          }
        />

        <Route path="/checkin/:activityId" element={<ActivityDetails />} />
        <Route path="/checkin/:userId" element={<Checkin />} />
        <Route
          path="/checkin/edit/:activityId"
          element={
            <IsPrivate>
              <EditCheckin />
            </IsPrivate>
          }
        />

        <Route
          path="/music"
          element={
            <IsPrivate>
              <Music />
            </IsPrivate>
          }
        />
        <Route
          path="/video"
          element={
            <IsPrivate>
              <Video />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
