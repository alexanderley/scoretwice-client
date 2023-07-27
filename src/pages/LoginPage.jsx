import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; // <== IMPORT
import API_URL from "../../apiKey";

import Form from "../ui/Form";

// const API_URL = "https://scoretwce-backend.onrender.com";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, setIsLoggedIn } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        console.log("Data foundUser Id: ", response.data.foundUser._id);
        const userId = response.data.foundUser._id;
        storeToken(response.data.authToken);
        // authenticateUser();
        setIsLoggedIn(true);
        navigate(`/profile/${userId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
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

      <p className="textCenter" style={{ marginTop: "10px" }}>
        Don't have an account yet?{" "}
        <span>
          {" "}
          <Link to={"/signup"} className="colorRed">
            {"  "}
            Sign up
          </Link>
        </span>
      </p>
    </div>
  );
}

export default LoginPage;
