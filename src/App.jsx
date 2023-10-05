import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ActivityDetails from "./components/ActivityDetails";
import Music from "./components/Music";
import Video from "./components/Video";
import Challenge from "./pages/Challenge";
import GeocodeForm from "./components/GoogleApi/Geocoder";
import AdminIsAnon from "./components/AdminIsAnon";
import Joke from "./components/Joke";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Checkin from "./pages/Checkin";
import EditCheckin from "./pages/EditCheckin";
import Favorite from "./pages/Favorite";
import EditBookmark from "./components/Bookmarks/EditBookmark";
import WorkoutPage from "./pages/WorkoutPage";
import StylesPage from "./pages/StylesPage";
import AdminWorkoutPage from "./pages/AdminWorkoutPage";
import AdminSignupPage from "./pages/AdminAuth/AdminSignupPage";
import AdminLoginPage from "./pages/AdminAuth/AdminLoginPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminStylePage from "./pages/AdminsStylePage";
import AdminIsPrivate from "./components/AdminIsPrivate";
import EachWorkout from "./components/AdminWorkout/EachWorkout";
import EachStyle from "./components/AdminStyle/EachStyle";

function App() {
  return (
    <div className="App">
      <div className="admin-routes"></div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
    
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

<Route
          path="/joke"
          element={
         
              <Joke />

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
        <Route
          path="/checkin"
          element={
            <IsPrivate>
              <Checkin />
            </IsPrivate>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <IsPrivate>
              <Favorite />
            </IsPrivate>
          }
        />

        <Route
          path="/style"
          element={
            <IsPrivate>
              <StylesPage />
            </IsPrivate>
          }
        />

        <Route
          path="/workout"
          element={
            <IsPrivate>
              <WorkoutPage />
            </IsPrivate>
          }
        />

        <Route
          path="/geocode"
          element={
            <AdminIsPrivate>
              <GeocodeForm />
            </AdminIsPrivate>
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

        <Route
          path="/checkin/:activityId"
          element={
            <IsPrivate>
              <ActivityDetails />
            </IsPrivate>
          }
        />
        {/* <Route path="/checkin/:userId" element={<Checkin />} /> */}
        <Route
          path="/checkin/edit/:activityId"
          element={
            <IsPrivate>
              <EditCheckin />
            </IsPrivate>
          }
        />

        <Route
          path="/bookmarks/edit/:bookmarkId"
          element={
            <IsPrivate>
              <EditBookmark />
            </IsPrivate>
          }
        />
      <Route
          path="/workout/:workoutId"
          element={
            <IsPrivate>
              <EachWorkout />
            </IsPrivate>
          }
        />

<Route
          path="/style/:styleId"
          element={
            <IsPrivate>
              <EachStyle />
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
          path="/admin-signup"
          element={
            <AdminIsAnon>
              <AdminSignupPage />
            </AdminIsAnon>
          }
        />
        <Route
          path="/admin-login"
          element={
            <AdminIsAnon>
              <AdminLoginPage />
            </AdminIsAnon>
          }
        />

        <Route
          path="/admin-workout"
          element={
            <AdminIsPrivate>
              <AdminWorkoutPage />
            </AdminIsPrivate>
          }
        />

        <Route
          path="/admin-style"
          element={
            <AdminIsPrivate>
              <AdminStylePage />
            </AdminIsPrivate>
          }
        />

        <Route
          path="/admin-profile"
          element={
            <AdminIsPrivate>
              <AdminProfilePage />
            </AdminIsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
