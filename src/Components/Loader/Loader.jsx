import React, { useEffect, useState } from "react";
import "./Loader.css";

function Loader() {
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(5);
  const [showText, setShowText] = useState(false);
  const [moveUp, setMoveUp] = useState(false);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 5; // Increase progress by 5% each time
        } else {
          clearInterval(progressTimer);
          setShowText(true);
          return 100;
        }
      });
    }, 20); // 20ms interval for a total of 2000ms (2 seconds)

    const timeTimer = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1; // Decrease time by 1 second
        } else {
          clearInterval(timeTimer);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(timeTimer);
    };
  }, []);

  useEffect(() => {
    if (showText) {
      setTimeout(() => {
        setMoveUp(true);
      }, 1000);
    }
  }, [showText]);

  return (
    <div className={`HomePage ${moveUp ? "move-up" : ""}`}>
      {showText && <h1 className="welcome-text">Welcome to the page</h1>}

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default Loader;
