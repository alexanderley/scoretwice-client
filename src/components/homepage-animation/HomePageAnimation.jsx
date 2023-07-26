import React, { useState, useEffect } from "react";
import styles from "./animation.module.css";
import logo from "../../assets/logo.png";

const LogoAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const animationDuration = 2000;

    setTimeout(() => {
      setShowAnimation(false);
      setShowLogo(true);
    }, animationDuration);
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
        <div>
          <div
            className={`${styles["logo-container"]} ${
              showAnimation ? "" : styles["transform-logo"]
            }`}
          >
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;
