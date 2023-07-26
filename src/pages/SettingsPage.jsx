import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import API_URL from "../../apiKey";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, setIsLoggedIn, storedToken } = useContext(AuthContext);

  const { id } = useParams();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleChangeSubmit = (e) => {
    console.log("changing settings");
    e.preventDefault();
    const requestBody = { email, password };

    axios.put(`${API_URL}/api/users/${id}`, requestBody).then((response) => {
      console.log("reponse change data: ", response.data);
    });

    // axios
    //   .post(`${API_URL}/auth/login`, requestBody)

    //   .then((response) => {
    //     console.log("JWT token", response.data.authToken);
    //     console.log("Data foundUser Id: ", response.data.foundUser._id);
    //     const userId = response.data.foundUser._id;
    //     storeToken(response.data.authToken);
    //     // authenticateUser();
    //     setIsLoggedIn(true);
    //     navigate(`/profile/${userId}`);
    //   })
    //   .catch((error) => {
    //     const errorDescription = error.response.data.message;
    //     setErrorMessage(errorDescription);
    //   });
  };

  return (
    <div className="LoginPage">
      <h1 className="textCenter">
        Change <br /> Settings
      </h1>

      <form onSubmit={handleChangeSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit" className="buttonRed fullWidth">
          Change Settings
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
