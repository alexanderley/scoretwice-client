import React from "react";

import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.loaderContainer}>
      <div
        className={styles.loader}
        style={{ color: "var(--red)", width: "120px" }}
      ></div>
    </div>
  );
}
