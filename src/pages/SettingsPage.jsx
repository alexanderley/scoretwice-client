import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import BackButton from "../ui/BackButton";

import API_URL from "../../apiKey";
import Footer from "../ui/Footer";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFristName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userMessage, setUserMessage] = useState("");

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");
  const { id } = useParams();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setUserMessage("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setUserMessage("");
  };
  const handleFirstName = (e) => {
    setFristName(e.target.value);
    setUserMessage("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserMessage(""); // This will execute setUserMessage("") after 2000 milliseconds
    }, 2000);

    // The cleanup function to clear the timeout when the component unmounts or when the userMessage changes
    return () => {
      clearTimeout(timer);
    };
  }, [userMessage]);

  const handleChangeSubmit = (e) => {
    console.log("changing settings");
    e.preventDefault();
    const requestBody = { email, password, firstName };

    axios
      .put(`${API_URL}/api/users/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("reponse change data: ", response.data);
        setUserMessage("User has been updated");
      });
  };

  const handleDelete = async () => {
    console.log("delete user");

    try {
      // First, delete the credit score
      const creditScoreResponse = await axios.delete(
        `${API_URL}/api/credit-score/${id}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      if (creditScoreResponse.status === 200) {
        console.log("Credit score deleted successfully.");
      }

      const userResponse = await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (userResponse.status === 200) {
        console.log("User deleted successfully.");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error deleting user or credit score:", error);
    }
  };

  return (
    <div className="LoginPage" style={{ marginBottom: "100px" }}>
      <BackButton to={`/profile/${id}`} />
      <h1 className="textCenter">
        Change <br /> Settings
      </h1>

      <form onSubmit={handleChangeSubmit}>
        <label>Change Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Change Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <label>Change Name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFirstName}
        />

        <button type="submit" className="buttonRed fullWidth">
          Change Settings
        </button>
      </form>
      <br />
      <button
        className="buttonRed fullWidth"
        style={{ backgroundColor: "#a81e29" }}
        onClick={handleDelete}
      >
        Delete Account
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p
        className="textCenter"
        style={{ color: "#50C878", margin: "20px", padding: 0 }}
      >
        <b>{userMessage}</b>
      </p>
      <Footer></Footer>
    </div>
  );
}
//
