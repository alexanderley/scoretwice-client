import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./semicircle.css";

const ProgressSemicircle = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="progress-container">
      <CircularProgressbar
        value={percentage}
        text={`${value}/${maxValue}`}
        styles={buildStyles({
          strokeLinecap: "round",
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: "#f88",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

export default ProgressSemicircle;
