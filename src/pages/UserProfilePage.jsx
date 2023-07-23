import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../apiKey";

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      if (storedToken) {
        try {
          const response = await axios.get(`${API_URL}/users/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          const userData = response.data;
          setUser(userData);
          console.log("user: ", user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      fetchUserData();
    };
  }, [id]);
  return (
    <>
      <h1>Welcome back Anna!</h1>
    </>
  );
}

// headers: { Authorization: `Bearer ${storedToken}` },
// })
