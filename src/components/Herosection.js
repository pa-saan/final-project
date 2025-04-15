import React from "react";
import "./HeroSection.css";
import { motion } from "framer-motion"; // Import motion for animation
import Button from "./button";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-box">
    
      <div className="hero-text">
      <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
        <h1> Defend and Stay  Ahead <br />of Cyber Threats.</h1>
        </motion.p>
        <p>
          A real-time training environment simulating multiple cyberattacks <br />like ransomware, phishing, 
          DDoS, malware, and more. 
        </p>
<Button/>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
