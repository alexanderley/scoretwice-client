import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";
import UserProfilePage from "./pages/UserProfilePage";

import CreditScoreForm from "./pages/creditScorePage";

import Footer from "./ui/Footer";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"; // <== IMPORT

import IsPrivate from "./components/IsPrivate"; // <== IMPORT
import IsAnon from "./components/IsAnon"; // <== IMPORT

function App() {
  return (
    <div className="App appBody">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/*   UPDATE THE BELOW ROUTES   */}
        <Route
          path="/projects"
          element={
            <IsPrivate>
              {" "}
              <ProjectListPage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/projects/:projectId"
          element={
            <IsPrivate>
              {" "}
              <ProjectDetailsPage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/projects/edit/:projectId"
          element={
            <IsPrivate>
              {" "}
              <EditProjectPage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />
        <Route path="/profile/:id" element={<UserProfilePage />} />
        <Route
          path="/credit-score/create"
          element={
            <IsPrivate>
              {" "}
              <CreditScoreForm />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <IsPrivate>
              <UserProfilePage />
            </IsPrivate>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

// http://localhost:5173/profile/64bbe772371846648850c32a
