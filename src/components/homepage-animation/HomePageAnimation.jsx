import React, { useState, useEffect } from "react";
import styles from "./animation.module.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const LogoAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [showButtons, setShowButtons] = useState(false); // New state for buttons

  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const animationDuration = 2000;

    setTimeout(() => {
      setShowAnimation(false);
      setShowLogo(true);
    }, animationDuration);

    const buttonsDelay = animationDuration + 1000; // Delay the buttons by 1 second after the logo fade-in
    setTimeout(() => {
      setShowButtons(true);
    }, buttonsDelay);
  }, []);

  return (
    <div className={styles["logo-animation"]}>
      {showAnimation && (
        <div className={styles["triangles-container"]}>
          <div className={`${styles.triangle} ${styles["triangle-1"]}`}></div>
          <div className={`${styles.triangle} ${styles["triangle-2"]}`}></div>
        </div>
      )}
      {showLogo && (
        <div className={styles.generalContainer}>
          <div
            className={`${styles["logo-container"]} ${
              showAnimation ? "" : styles["transform-logo"]
            }`}
          >
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>
        </div>
      )}
      {showButtons && (
        <div className={styles.centeredContainer}>
          <div className={styles.pageContent}>
            <button className={styles.signUpButton} onClick={handleSignUpClick}>
              Sign Up
            </button>
            <p>Already have an account?</p>
            <Link to={"/login"} className={styles.loginLink}>
              Login here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;
