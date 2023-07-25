import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FontAwesomeIcon icon={faCoffee} />
      <i className="fas fa-globe"></i>
      <div className={styles.footerBtnContainer}>
        <div className={styles.roundBtn}>1</div>
        <span className={styles.span}>Account</span>
      </div>
      <div className={styles.footerBtnContainer}>
        <div className={styles.roundBtn}>1</div>
        <span className={styles.span}>CreditScore</span>
      </div>
      <div className={styles.footerBtnContainer}>
        <div className={styles.roundBtn}>1</div>
        <span className={styles.span}>Invesments</span>
      </div>
      <div className={styles.footerBtnContainer}>
        <div className={styles.roundBtn}>1</div>
        <span className={styles.span}>Profile</span>
      </div>
    </footer>
  );
}
