import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CreditScore from "./pages/CreditScore";

import TransactionsPage from "./pages/TransactionsPage"; T
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"; 

import IsPrivate from "./components/IsPrivate"; 
import IsAnon from "./components/IsAnon"; 

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
    </div>
  );
}

export default App;