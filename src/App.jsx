import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
import logo from "./assets/sv-logo.png";
// import logo from "./assets";

import UserProfilePage from "./pages/UserProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CreditScore from "./pages/CreditScore";

import TransactionsPage from "./pages/TransactionsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import HomePage from "./pages/homepage/HomePage";
import Footer from "./ui/Footer";

function App() {
  const { id } = useParams();
  return (
    <div className="App appBody">
      <div className="centerFlex">
        <img
          src={logo}
          alt="Logo"
          style={{ margin: "0 auto", width: "75px", marginBottom: "20px" }}
        />
      </div>

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
    </div>
  );
}

export default App;
