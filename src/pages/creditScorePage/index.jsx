import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../apiKey";

import styles from "./creditscore.module.css";

// const API_URL = "http://localhost:5005";
// const API_URL = "https://scoretwce-backend.onrender.com";

function CreditScoreForm(props) {
  const [carOwned, setCarOwned] = useState("");
  const [propertyOwned, setPropertyOwned] = useState("");
  const [childrenCount, setChildrenCount] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [daysFromEmployment, setDaysFromEmployment] = useState("");
  const [ownedEmail, setOwnedEmail] = useState("");
  const [ownedWorkphone, setOwnedWorkphone] = useState("");
  const [creditStatus, setCreditStatus] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleCarOwned = (e) => setCarOwned(e.target.value);
  const handlePropertyOwned = (e) => setPropertyOwned(e.target.value);
  const handleChildrenCount = (e) => setChildrenCount(e.target.value);
  const handleAnnualIncome = (e) => setAnnualIncome(e.target.value);
  const handleEducationLevel = (e) => setEducationLevel(e.target.value);
  const handleMaritalStatus = (e) => setMaritalStatus(e.target.value);
  const handleDaysFromEmployment = (e) => setDaysFromEmployment(e.target.value);
  const handleOwnedEmail = (e) => setOwnedEmail(e.target.value);
  const handleOwnedWorkphone = (e) => setOwnedWorkphone(e.target.value);
  const handleCreditstatus = (e) => setCreditStatus(e.target.value);

  const handleCreditScoreSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      carOwned,
      propertyOwned,
      childrenCount,
      annualIncome,
      educationLevel,
      maritalStatus,
      daysFromEmployment,
      ownedEmail,
      ownedWorkphone,
      creditStatus,
    };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/api/credit-score`, requestBody)
      .then((response) => {
        navigate("/credit-score/create");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="CreditScoreForm">
      <h1 className="textCenter">Credit Score Calculation</h1>
      <h3>
        Please fill out this form so we can calculate your overall credit score
      </h3>

      <form
        onSubmit={handleCreditScoreSubmit}
        className={styles.creditScoreForm}
      >
        <label>Do you own a car?</label>
        <div className={styles.radioContainer}>
          <div>
            <input
              type="radio"
              name="carOwned"
              value="yes"
              checked={carOwned === true}
              onChange={handleCarOwned}
            />
            <label>Yes</label>
          </div>
          <div>
            <input
              type="radio"
              name="carOwned"
              value="no"
              checked={carOwned === false}
              onChange={handleCarOwned}
            />
            <label>No</label>
          </div>
        </div>

        <button type="submit" className="buttonRed fullWidth">
          Calculate Credit Score
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}
//

export default CreditScoreForm;
