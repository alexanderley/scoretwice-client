import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../apiKey";
import Footer from "../../ui/Footer";
import ProgressSemicircle from "../../components/progress-semicircle/ProgressSemicircle";
import styles from "./creditscore.module.css";
import CreditScoreAdvice from "../../components/creditscore-info";
import BackButton from "../../ui/BackButton";
import LoadingSpinner from "../../ui/LoadingSpinner";

export default function CreditScorePage() {
  const storedToken = localStorage.getItem("authToken");
  const [creditScore, setCreditScore] = useState(null);
  const [value, onChange] = useState(new Date());
  const [isLoading, setIsloading] = useState(true);

  const { id } = useParams();

  console.log(value);

  const getCreditScore = () => {
    // const onChange = () => {};

    axios
      .get(`${API_URL}/api/credit-score/:id`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneCreditScore = response.data;
        setCreditScore(oneCreditScore);
        setIsloading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCreditScore();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <BackButton to={`/profile/${id}`} />
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
          <CreditScoreAdvice creditScore={creditScore.creditScoreGrade} />
        </div>
      )}
      <Footer />
    </div>
  );
}
