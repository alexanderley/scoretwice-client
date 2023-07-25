import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../apiKey";
import Footer from "../../ui/Footer";

export default function CreditScorePage() {
  const storedToken = localStorage.getItem("authToken");
  const [creditScore, setCreditScore] = useState(null);
  const [value, onChange] = useState(new Date());

  console.log(value);

  const getCreditScore = () => {
    // const onChange = () => {};

    axios
      .get(`${API_URL}/api/credit-score`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneCreditScore = response.data;
        setCreditScore(oneCreditScore);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCreditScore();
  }, []);

  return (
    <div>
      {creditScore && (
        <div>
          <h1>Credit Score</h1>
          <h3>here is your credit score, you dumb bitch</h3>
          <div>{creditScore.creditScoreGrade}</div>
        </div>
      )}

      <p>Something</p>

      <Footer />
    </div>
  );
}
