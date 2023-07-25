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

  const storedToken = localStorage.getItem("authToken");
  const { id } = useParams();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleChangeSubmit = (e) => {
    console.log("changing settings");
    e.preventDefault();
    const requestBody = { email, password };

    // check whatever hasb been added in the for
    // let assert = () => {
    //     console.log("these are password and email:", password, email);
    //     if (email && password) {
    //       return { email, password };
    //     } else if (email && !password) {
    //       return { email };
    //     } else if (!email && password) {
    //       return { password };
    //     } else {
    //       return {};
    //     }
    //   };

    //   result = assert();
    // console.log(result);

    //   Update the user
    //   User.findByIdAndUpdate(_id, result, { new: true })
    //   .then((updatedUser) => {
    //     req.session.currentUser = updatedUser;
    //     console.log("User updated: ", updatedUser);
    //     res.redirect("/userProfile");
    //   })
    //   .catch((error) => next(error));

    axios
      .put(`${API_URL}/api/users/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("reponse change data: ", response.data);
      });
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
