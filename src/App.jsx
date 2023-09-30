import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import DailyApp from "./components/DailyApp";

// import ProjectListPage from "./pages/ProjectListPage";
// import ProjectDetailsPage from "./pages/ProjectDetailsPage";
// import EditProjectPage from "./pages/EditProjectPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
//import InspirationPage from "./pages/Inspo";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              
              <DailyApp />
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

        {/*} <Route
          path="/projects/:projectId"
          element={ <IsPrivate> <ProjectDetailsPage /> </IsPrivate> }
        /> */}

        {/* <Route
          path="/projects/edit/:projectId"
          element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } 
        />
         */}

        {/* <Route
          path="/inspiration"
          element={
            <IsPrivate>
              <InspirationPage />
            </IsPrivate>
          }
        /> */}
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
