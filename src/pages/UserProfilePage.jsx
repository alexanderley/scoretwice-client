import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../apiKey";
import SemiCircleChart from "../ui/SemiCircleChart";

// specific styles for this Component
import styles from "./UserProfilePage.module.css";

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  const [value, onChange] = useState(new Date());

  console.log(value);

  // const onChange = () => {};

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
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      {user ? (
        <>
          <h2 className="textCenter colorRed">
            Welcome back, {user.firstName}!
          </h2>
          <div className={`cardContainer ${styles.balanceContainer}`}>
            <div className={styles.balanceContainer}>
              <span>
                <b>Account balance:</b>
              </span>
              <span>{user.account.balance} $</span>
            </div>
          </div>
          <SemiCircleChart min={0} max={1000} value={750} />
        </>
      ) : (
        ""
      )}
    </>
  );
}
