import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUser,
  faArrowTrendUp,
  faCreditCard,
  faGear,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <i className="fas fa-globe"></i> */}
      <div className={styles.footerBtnContainer}>
        <div className={styles.roundBtn}>
          <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
        </div>
        <span className={styles.span}>Profile</span>
      </div>

      <div className={styles.footerBtnContainer}>
        <div className={styles.roundBtn}>
          <FontAwesomeIcon icon={faCreditCard} style={{ color: "white" }} />
        </div>
        <span className={styles.span}>Invesments</span>
      </div>
      <div className={styles.footerBtnContainer}>
        <div className={styles.roundBtn}>
          <FontAwesomeIcon icon={faBolt} style={{ color: "white" }} />
        </div>
        <span className={styles.span}>CreditScore</span>
      </div>
      <div className={styles.footerBtnContainer}>
        <div className={styles.roundBtn}>
          {" "}
          <FontAwesomeIcon icon={faGear} style={{ color: "white" }} />
        </div>
        <span className={styles.span}>Profile</span>
      </div>
    </footer>
  );
}
