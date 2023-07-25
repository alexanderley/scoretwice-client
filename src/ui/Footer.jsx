import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faGear,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.css";
import { NavLink, useParams } from "react-router-dom";

export default function Footer() {
  const { id } = useParams();

  return (
    <footer className={styles.footer}>
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
        <span className={styles.span}>Accounts</span>
      </div>
      <div className={styles.footerBtnContainer}>
        <div className={styles.roundBtn}>
          <FontAwesomeIcon icon={faBolt} style={{ color: "white" }} />
        </div>
        <span className={styles.span}>CreditScore</span>
      </div>
      <div className={styles.footerBtnContainer}>
        <NavLink
          to={`/settings/${id}`}
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#545e6f",
            background: isActive ? "#7600dc" : "#f0f0f0",
          })}
        >
          <div className={styles.footerBtnContainer}>
            <div className={styles.roundBtn}>
              <FontAwesomeIcon icon={faGear} style={{ color: "white" }} />
            </div>
            <span className={styles.span}>CreditScore</span>
          </div>
        </NavLink>
      </div>
    </footer>
  );
}
