import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../apiKey";
import Footer from "../../ui/Footer";
import ProgressSemicircle from "../../components/progress-semicircle/ProgressSemicircle";
import styles from "./creditscore.module.css";

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
          <h1>Your Credit Score</h1>

          <div className={styles.ProgressSemicircle}>
            <ProgressSemicircle
              value={creditScore.creditScoreGrade}
              maxValue={1000}
            />
          </div>

          <div className={styles.sentence}>
            You have a credit score of{" "}
            <span
              style={{
                color:
                  creditScore.creditScoreGrade < 600
                    ? "red"
                    : creditScore.creditScoreGrade < 800
                    ? "orange"
                    : "green",
              }}
            >
              {creditScore.creditScoreGrade}{" "}
            </span>
            points.
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
