import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";
import UserProfilePage from "./pages/UserProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CreditScore from "./pages/CreditScore";

import CreditScoreForm from "./pages/creditScorePage/creditScoreForm";

import Footer from "./ui/Footer";
import TransactionsPage from "./pages/TransactionsPage"; //<== IMPORT
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"; // <== IMPORT

import IsPrivate from "./components/IsPrivate"; // <== IMPORT
import IsAnon from "./components/IsAnon"; // <== IMPORT
import CreditScorePage from "./pages/creditScorePage/creditScorePage";

function App() {
  return (
    <div className="App appBody">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

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
          path="/credit-score/:id"
          element={
            <IsPrivate>
              <CreditScore></CreditScore>
            </IsPrivate>
          }
        />

        <Route
          path="/transactions/:id"
          element={
            <IsPrivate>
              <TransactionsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/settings/:id"
          element={
            <IsPrivate>
              <SettingsPage />
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
