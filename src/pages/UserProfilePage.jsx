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
} from "recharts";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import logo from "../assets/sv-logo.png";

// specific styles for this Component
import styles from "./UserProfilePage.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";
import CreditScore from "./CreditScore";

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const [creditScoreNumber, setCreditScoreNumber] = useState(0);
  const [creditScore, setCreditScore] = useState(0);
  const [isLoading, setIsloading] = useState(true);
  const [creditScoreExists, setCreditScoreExists] = useState(false);

  const { logOutUser } = useContext(AuthContext);

  const getCreditScore = () => {
    axios
      .get(`${API_URL}/api/credit-score/:id`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setCreditScoreExists(true);
          setIsloading(false);
          setCreditScore(response.data.creditScoreGrade / 10);
          setCreditScoreNumber(response.data.creditScoreGrade);
          console.log(creditScore);
        } else {
          setCreditScoreExists(false);
          setIsloading(false);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getCreditScore();
  }, []);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    console.log("fetch");
    const fetchUserData = async () => {
      if (storedToken) {
        try {
          const response = await axios.get(`${API_URL}/api/users/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          const userData = response.data;
          setUser(userData);

          console.log("user: ", user);

          setIsloading(false);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {user ? (
        <div className={styles.userPageWrapper}>
          <img
            src={logo}
            alt="Logo"
            style={{ margin: "0 auto", width: "45px" }}
          />
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
            <LineChart
              width={300}
              height={180}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              {/* <Tooltip /> */}
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#e94653"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#A81E29" />
            </LineChart>
          </div>
        </div>
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}
