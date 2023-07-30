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
    window.location.href = "/signup";
  };

  useEffect(() => {
    const animationDuration = 1000;

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
            <button
              className={styles.signUpButton}
              onClick={handleSignUpClick}
              style={{ marginBottom: "20px" }}
            >
              Sign Up
            </button>
            <div className="loginContainer">
              <Link
                to={`/login`}
                style={{ display: "block" }}
                className="buttonBorder fullWidth textCenter"
              >
                Login
              </Link>
              <p
                style={{
                  margin: "0",
                  marginTop: "5px",
                  fontSize: "var(--font-xs)",
                }}
              >
                Already have an account?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;
