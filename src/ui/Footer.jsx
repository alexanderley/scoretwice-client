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
      <NavLink
        to={`/profile/${id}`}
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.inactiveLink
        }
      >
        <div className={styles.footerBtnContainer}>
          <div className={styles.roundBtn}>
            <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
          </div>
          <span className={styles.span}>Profile</span>
        </div>
      </NavLink>
      <NavLink
        to={`/transactions/${id}`}
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.inactiveLink
        }
      >
        <div className={styles.footerBtnContainer}>
          <div className={styles.roundBtn}>
            <FontAwesomeIcon icon={faCreditCard} style={{ color: "white" }} />
          </div>
          <span className={styles.span}>Account</span>
        </div>
      </NavLink>
      <NavLink
        to={`/credit-score/${id}`}
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.inactiveLink
        }
      >
        <div className={styles.footerBtnContainer}>
          <div className={styles.roundBtn}>
            <FontAwesomeIcon icon={faBolt} style={{ color: "white" }} />
          </div>
          <span className={styles.span}>CreditScore</span>
        </div>
      </NavLink>

      <NavLink
        to={`/settings/${id}`}
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.inactiveLink
        }
      >
        <div className={styles.footerBtnContainer}>
          <div className={styles.roundBtn}>
            <FontAwesomeIcon icon={faGear} style={{ color: "white" }} />
          </div>
          <span className={styles.span}>Settings</span>
        </div>
      </NavLink>
    </footer>
  );
}

// credit-score/64bf7697243cee23465e6e78
// http://localhost:5173/credit-score/64bf7697243cee23465e6e78/create
// http://localhost:5173/profile/64bf7697243cee23465e6e78/transactions
