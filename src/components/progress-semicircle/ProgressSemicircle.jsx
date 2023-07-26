import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./semicircle.css";

const ProgressSemicircle = ({ value, maxValue }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Simulate the animation by updating the progress value with a delay
    const animationDuration = 1500; // Animation duration in milliseconds
    const animationSteps = 50; // Number of animation steps
    const stepDuration = animationDuration / animationSteps;
    const stepValue = value / animationSteps;

    let step = 1;

    const interval = setInterval(() => {
      setCurrentValue((prevValue) => {
        const newValue = prevValue + stepValue;
        return newValue > value ? value : newValue;
      });

      step++;

      if (step > animationSteps) {
        clearInterval(interval);
      }
    }, stepDuration);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="progress-container">
      <CircularProgressbar
        value={(currentValue / maxValue) * 100}
        text={`${Math.floor(currentValue)}/${maxValue}`}
        styles={buildStyles({
          strokeLinecap: "round",
          textSize: "16",
          pathColor: `rgba(220, 53, 69, ${currentValue / maxValue})`,
          textColor: "#f88",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

export default ProgressSemicircle;
