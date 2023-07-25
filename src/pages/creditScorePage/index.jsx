import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../apiKey";
import Footer from "../../ui/Footer";
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
  const handleChildrenCount = (e) => {
    const value = e.target.value;
    // Check if the value is a valid number within the specified range or an empty string
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 10)) {
      // Update the state with the entered value
      setChildrenCount(value);
    }
  };
  const handleAnnualIncome = (e) => {
    const value = e.target.value;
    // Check if the value is a valid number within the specified range or an empty string
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 1000000)) {
      // Update the state with the entered value
      setAnnualIncome(value);
    }
  };
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
      <h3 className="">
        Please fill out this form so we can calculate your overall credit score
      </h3>

      <form
        onSubmit={handleCreditScoreSubmit}
        className={styles.creditScoreForm}
      >
        <label>Do you own a car?</label>
        <div className={styles.radioContainer}>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="carOwned"
              value={true}
              checked={carOwned}
              onChange={handleCarOwned}
            />
            <label>Yes</label>
          </div>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="carOwned"
              value={false}
              checked={carOwned}
              onChange={handleCarOwned}
            />
            <label>No</label>
          </div>
        </div>

        <label>Do you own any property?</label>
        <div className={styles.radioContainer}>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="propertyOwned"
              value={true}
              checked={propertyOwned}
              onChange={handlePropertyOwned}
            />
            <label>Yes</label>
          </div>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="propertyOwned"
              value={false}
              checked={propertyOwned}
              onChange={handlePropertyOwned}
            />
            <label>No</label>
          </div>
        </div>

        <label>How many children/dependants do you have?</label>
        <div className={styles.radioContainer}>
          <div className={styles.containerDiv}>
            <input
              type="number"
              name="childrenCount"
              value={childrenCount}
              onChange={handleChildrenCount}
              min="0"
              max="10"
              step="1"
            />
          </div>
        </div>

        <label>What is your annual income?</label>
        <div className={styles.radioContainer}>
          <div className={styles.containerDiv}>
            <input
              type="number"
              name="annualIncome"
              value={annualIncome}
              onChange={handleAnnualIncome}
              min="0"
              max="1000000"
              step="1"
            />
          </div>
        </div>

        <label>What is your level of education?</label>
        <select
          name="educationLevel"
          value={educationLevel}
          onChange={handleEducationLevel}
        >
          <option value="">Select</option>
          <option value="lower secondary">Lower Secondary</option>
          <option value="secondary">Secondary</option>
          <option value="incomplete higher">Incomplete Higher</option>
          <option value="higher education">Higher Education</option>
          <option value="academic degree">Academic Degree</option>
        </select>

        <label>What is your marital status?</label>
        <select
          name="maritalStatus"
          value={maritalStatus}
          onChange={handleMaritalStatus}
        >
          <option value="">Select</option>
          <option value="lower secondary">Lower Secondary</option>
          <option value="secondary">Secondary</option>
          <option value="incomplete higher">Incomplete Higher</option>
          <option value="higher education">Higher Education</option>
          <option value="academic degree">Academic Degree</option>
        </select>

        <button type="submit" className="buttonRed fullWidth">
          Calculate Credit Score
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Footer />
    </div>
  );
}
//

export default CreditScoreForm;
