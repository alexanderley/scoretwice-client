import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; // <== IMPORT

import Form from "../ui/Form";

const API_URL = "http://localhost:5005";

// const API_URL = "https://scoretwce-backend.onrender.com";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)

      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);
        console.log("Data foundUser Id: ", response.data.foundUser._id);
        const userId = response.data.foundUser._id;
        storeToken(response.data.authToken);
        navigate(`/profile/${userId}`);
        authenticateUser();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const loginFormFields = {
    fields: [
      {
        name: "email",
        type: "text",
        placeholder: "Email",
        rules: { required: true, pattern: /^\S+@\S+$/i },
        errorText: "Email not registered or not valid!",
      },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
        rules: { required: true, maxLength: 80 },
        errorText: "Enter a valid Password!",
      },
    ],
  };

  return (
    <div className="LoginPage">
      <h1 className="textCenter">Login</h1>

      <form onSubmit={handleLoginSubmit}>
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
          Login
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
