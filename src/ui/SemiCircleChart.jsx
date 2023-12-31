import React from "react";
// import styles from './SemiCircleChart.module.css';
import styles from "./SemiCircleChart.module.css";

export default function SemiCircleChart({ min, max, value }) {
  const data = {
    initial: {
      unit: "GB",
      value: 2,
    },
    remaining: {
      unit: "GB",
      value: 0.9,
    },
    type: "Internet",
  };
  const angle = (value / max) * 180;
  const style = { "--angle": angle + "deg" };

  // return (
  //   <div className="sc-gauge">
  //     <h1 className="textCenter">Credit Score</h1>
  //     <div className="sc-background">
  //       <div className="sc-percentage" style={style}></div>
  //       <div className="sc-mask"></div>
  //       <span className="sc-value">{value}</span>
  //     </div>
  //     <span className="sc-min">{min}</span>
  //     <span className="sc-max">{max}</span>
  //   </div>
  // );

  return (
    <div className={styles.scGauge}>
      <h2 className="textCenter">Credit Score</h2>
      <div className={styles.scBackground}>
        <div className={styles.scPercentage} style={style}></div>
        <div className={styles.scMask}></div>
        <span className={styles.scValue}>{value}</span>
      </div>
      <span className={styles.scMin}>{min}</span>
      <span className={styles.scMax}>{max}</span>
    </div>
  );
}
