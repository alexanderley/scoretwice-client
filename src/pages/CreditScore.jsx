// import React, { useEffect, useState } from "react";
// import CreditScoreForm from "./creditScorePage/creditScoreForm";
// import CreditScorePage from "./creditScorePage/creditScorePage";
// import Footer from "../ui/Footer";
// import { useParams } from "react-router-dom";
// import API_URL from "../../apiKey";
// import axios from "axios";
// import LoadingSpinner from "../ui/LoadingSpinner";

// export default function CreditScore() {
//   const storedToken = localStorage.getItem("authToken");
//   const { id } = useParams();
//   const [creditScoreExists, setCreditScoreExists] = useState(false);
//   const [isLoading, setIsloading] = useState(false);

//   const getCreditScore = () => {
//     axios
//       .get(`${API_URL}/api/credit-score/:id`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         if (response.data) {
//           setCreditScoreExists(true);
//           setIsloading(false);
//           console.log("is true: ", creditScoreExists);
//         } else {
//           setCreditScoreExists(false);
//           setIsloading(false);
//         }
//       })
//       .catch((error) => console.log(error));
//   };
//   useEffect(() => {
//     getCreditScore();
//   }, []);

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <>
//       {/* <LoadingSpinner></LoadingSpinner> */}
//       {creditScoreExists ? <CreditScorePage /> : <CreditScoreForm />}
//       <Footer />
//     </>
//   );
// }
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
  const [isLoading, setIsloading] = useState(true); // Set initial state to true

  const getCreditScore = () => {
    axios
      .get(`${API_URL}/api/credit-score/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        if (response.data) {
          setCreditScoreExists(true);
        } else {
          setCreditScoreExists(false);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsloading(false); // Set isLoading to false after API call completion (success or error)
      });
  };

  useEffect(() => {
    getCreditScore();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {creditScoreExists ? <CreditScorePage /> : <CreditScoreForm />}
      <Footer />
    </>
  );
}
