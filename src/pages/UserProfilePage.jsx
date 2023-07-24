import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../apiKey";
import SemiCircleChart from "../ui/SemiCircleChart";

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  // useEffect(() => {
  //   console.log("fetch");
  //   const fetchUserData = async () => {
  //     if (storedToken) {
  //       try {
  //         const response = await axios.get(`${API_URL}/users/${id}`, {
  //           headers: { Authorization: `Bearer ${storedToken}` },
  //         });
  //         const userData = response.data;
  //         setUser(userData);
  //         console.log("user: ", user);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     }
  //   };
  //   fetchUserData();
  // }, [id]);
  return (
    <>
      <h1 className="textCenter">Welcome back Anna!</h1>
      <div className="cardContainer">
        <h2>Account balance:</h2>
        <span>10.000$</span>
      </div>
      <SemiCircleChart min={0} max={1000} value={750} />
    </>
  );
}
