import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  console.log("isPrivate loading..");

  // useEffect(() => {
  //   const protect = () => {
  //     console.log("Logged In changed!");
  //     if (isLoading) return <p>Loading ...</p>;

  //     if (!isLoggedIn) {
  //       // If the user is not logged in
  //       return <Navigate to="/login" />;
  //     } else {
  //       // If the user is logged in, allow to see the page
  //       return children;
  //     }
  //   };
  //   protect();
  // }, [isLoggedIn]);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    // If the user is not logged in
    return <Navigate to="/login" />;
  } else {
    // If the user is logged in, allow to see the page
    return children;
  }
}

export default IsPrivate;
