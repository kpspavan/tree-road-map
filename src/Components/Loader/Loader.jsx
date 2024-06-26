// Loading.js
import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

import "./Loader.css";

const Loading = () => {
  return (
    <>
      <div class="loading-container">
        <div class="loading-text">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
      
    </>
  );
};

export default Loading;
