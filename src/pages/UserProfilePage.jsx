import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../apiKey";
import SemiCircleChart from "../ui/SemiCircleChart";
import Footer from "../ui/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import logo from "../assets/sv-logo.png";

import styles from "./UserProfilePage.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const [creditScoreNumber, setCreditScoreNumber] = useState(0);
  const [creditScore, setCreditScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [creditScoreExists, setCreditScoreExists] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]); // Add userTransactions state

  const { logOutUser } = useContext(AuthContext);

  const getCreditScore = () => {
    axios
      .get(`${API_URL}/api/credit-score/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setCreditScoreExists(true);
          setIsLoading(false);
          setCreditScore(response.data.creditScoreGrade / 10);
          setCreditScoreNumber(response.data.creditScoreGrade);
          console.log(creditScore);
        } else {
          setCreditScoreExists(false);
          setIsLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const fetchUserTransactions = () => {
    axios
      .get(`${API_URL}/api/users/${id}/transactions`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setUserTransactions(response.data.transactions.reverse());
        // Update the chart data with the new transactions
        updateChartData(response.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  // Function to update the chart data based on the user's transactions
  const updateChartData = (transactions) => {
    const data = transactions.map((transaction, index) => ({
      id: index + 1, // X-axis value representing the transaction order
      amount: transaction.amount, // Y-axis value representing the transaction amount
    }));
    setChartData(data);
  };

  useEffect(() => {
    getCreditScore();

    const fetchUserData = async () => {
      if (storedToken) {
        try {
          const response = await axios.get(`${API_URL}/api/users/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          const userData = response.data;
          setUser(userData);

          console.log("user: ", user);

          setIsLoading(false);

          setTimeout(() => {
            // setCreditScore(70);
          }, 1000);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchUserTransactions();
  }, [storedToken]);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : ""}
      {user ? (
        <div className={styles.userPageWrapper}>
          {/* <img
            src={logo}
            alt="Logo"
            style={{ margin: "0 auto", width: "45px" }}
          /> */}
          <h2 className="textCenter colorRed">
            Welcome back, <br /> {user.firstName}!
          </h2>
          <div className={`cardContainer ${styles.balanceContainer}`}>
            <div className={styles.balanceContainer}>
              <span>
                <b>Account balance:</b>
              </span>
              <span>{user.account.balance} $</span>
            </div>
          </div>

          <button className="buttonRed" onClick={logOutUser}>
            <b>LOGOUT</b>
          </button>
          <div
            className="cardContainer"
            style={{ padding: "20px 40px", height: "230px" }}
          >
            {/* <SemiCircleChart min={0} max={1000} value={750} /> */}
            <h2 className="textCenter">Credit Score</h2>
            <div
              className="creditScoreWrapper"
              style={{
                height: "100px",
                boxSizing: "borderBox",
                padding: "20px",
              }}
            >
              <CircularProgressbar
                value={creditScore}
                circleRatio={0.5}
                // style={{ width: "50px" }}
                styles={{
                  root: {
                    transform: "rotate(0.75turn)",
                  },
                  path: { stroke: "var(--red)" },
                  trailColor: "grey",
                  backgroundColor: "red",
                }}
              />
            </div>
            <h1 className="centerDiv" style={{ display: "table" }}>
              {creditScoreNumber}
            </h1>
          </div>

          <div
            className="cardContainer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2 className="textCenter">Transactions</h2>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#e94653"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}
