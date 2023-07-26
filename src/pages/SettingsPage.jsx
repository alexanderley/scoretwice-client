import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import API_URL from "../../apiKey";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFristName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");
  const { id } = useParams();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFristName(e.target.value);

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
      })
      .then(() => {});
  };

  const handleDelte = () => {
    console.log("delete user");
    axios.delete(`${API_URL}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  };

  return (
    <div className="LoginPage">
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
        onClick={handleDelte}
      >
        Delete Account
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
