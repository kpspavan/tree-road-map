import React from "react";
import Lottie from "react-lottie";
import "./Loader.css"// Replace with your smoke animation JSON file

const SmokeLoading = () => {
  return (
    <div className="wave-container">
    <div className="wave">
      <svg className="wave-svg" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
        <path className="wave-path" fill="#FFFFFF" d="M0 44c40 0 40 72 80 72s40-72 80-72 40 72 80 72 40-72 80-72 40 72 80 72 40-72 80-72 40 72 80 72v56h-640z">
          <animate repeatCount="indefinite" attributeName="d" dur="10s" values="
            M0 56c40 0 40 56 80 56s40-56 80-56 40 56 80 56 40-56 80-56 40 56 80 56 40-56 80-56 40 56 80 56 40-56 80-56v56h-640z;
            M0 56c40 56 40-56 80-56s40 56 80 56 40-56 80-56 40 56 80 56 40-56 80-56 40 56 80 56 40-56 80-56v56h-640z;
            M0 56c40-56 40 56 80 56s40-56 80-56 40 56 80 56 40-56 80-56 40 56 80 56 40-56 80-56 40 56 80 56 40-56 80-56v56h-640z"
          />
        </path>
      </svg>
    </div>
  </div>
  );
};
export default SmokeLoading;
