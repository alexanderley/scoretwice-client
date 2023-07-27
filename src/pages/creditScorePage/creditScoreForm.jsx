import { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../apiKey";
import Footer from "../../ui/Footer";
import styles from "./creditscore.module.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import BackButton from "../../ui/BackButton";
import { CreditContext } from "../../context/creditscore.context";
// const API_URL = "http://localhost:5005";
// const API_URL = "https://scoretwce-backend.onrender.com";

function CreditScoreForm(props) {
  const [carOwned, setCarOwned] = useState(false);
  const [propertyOwned, setPropertyOwned] = useState(false);
  const [childrenCount, setChildrenCount] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [daysFromEmployment, setDaysFromEmployment] = useState("");
  const [ownedEmail, setOwnedEmail] = useState(false);
  const [ownedWorkphone, setOwnedWorkphone] = useState(false);
  const [creditStatus, setCreditStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { setCreditScoreExists } = useContext(CreditContext);

  const navigate = useNavigate();
  const { id } = useParams();

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

    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(
        `${API_URL}/api/credit-score/${id}/create`,
        requestBody,
        requestHeaders
      )
      .then((response) => {
        setCreditScoreExists(true);
        navigate(`/credit-score/${id}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="CreditScoreForm">
      <BackButton to={`/profile/${id}`} />
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
              value="true"
              checked={carOwned === true}
              onChange={() => setCarOwned(true)}
            />
            <label>Yes</label>
          </div>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="carOwned"
              value="false"
              checked={carOwned === false}
              onChange={() => setCarOwned(false)}
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
              value="true"
              checked={propertyOwned === true}
              onChange={() => setPropertyOwned(true)}
            />
            <label>Yes</label>
          </div>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="propertyOwned"
              value="false"
              checked={propertyOwned === false}
              onChange={() => setPropertyOwned(false)}
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
          <option value="Married">Married</option>
          <option value="Single/ not married">Single/ not married</option>
          <option value="Separated">Separated</option>
          <option value="Widow">Widow</option>
          <option value="Civil Marriage">Civil Marriage</option>
        </select>

        <label>Do you use email?</label>
        <div className={styles.radioContainer}>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="ownedEmail"
              value="true"
              checked={ownedEmail === true}
              onChange={() => setOwnedEmail(true)}
            />
            <label>Yes</label>
          </div>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="ownedEmail"
              value="false"
              checked={ownedEmail === false}
              onChange={() => setOwnedEmail(false)}
            />
            <label>No</label>
          </div>
        </div>

        <label>When did you first start working?</label>
        <DatePicker
          className={styles.workDate}
          value={daysFromEmployment}
          onChange={setDaysFromEmployment}
          dateFormat="yyyy-MM-dd"
        />

        <label>Does your employer provide you with a workphone?</label>
        <div className={styles.radioContainer}>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="ownedWorkphone"
              value="true"
              checked={ownedWorkphone === true}
              onChange={() => setOwnedWorkphone(true)}
            />
            <label>Yes</label>
          </div>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="ownedWorkphone"
              value="false"
              checked={ownedWorkphone === false}
              onChange={() => setOwnedWorkphone(false)}
            />
            <label>No</label>
          </div>
        </div>

        <label>Do you have any current credits/loans?</label>
        <div className={styles.radioContainer}>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="creditStatus"
              value="true"
              checked={creditStatus === true}
              onChange={() => setCreditStatus(true)}
            />
            <label>Yes</label>
          </div>
          <div className={styles.containerDiv}>
            <input
              type="radio"
              name="creditStatus"
              value="false"
              checked={creditStatus === false}
              onChange={() => setCreditStatus(false)}
            />
            <label>No</label>
          </div>
        </div>

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
