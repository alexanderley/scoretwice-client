import React, { useEffect, useState, useContext } from "react";
import CreditScoreForm from "./creditScorePage/creditScoreForm";
import CreditScorePage from "./creditScorePage/creditScorePage";
import { CreditContext } from "../context/creditscore.context";

import Footer from "../ui/Footer";
import { useParams } from "react-router-dom";
import API_URL from "../../apiKey";
import axios from "axios";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function CreditScore() {
  const storedToken = localStorage.getItem("authToken");
  const { id } = useParams();
  const { creditScoreExists, setCreditScoreExists } = useContext(CreditContext);
  const [isLoading, setIsloading] = useState(true);

  const getCreditScore = () => {
    axios
      .get(`${API_URL}/api/credit-score/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(setIsloading(false))
      .then((response) => {
        if (response.data) {
          setCreditScoreExists(true);
        } else {
          setCreditScoreExists(false);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCreditScore();
  }, []);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : ""}
      {creditScoreExists ? <CreditScorePage /> : <CreditScoreForm />}
      <Footer />
    </>
  );
}
