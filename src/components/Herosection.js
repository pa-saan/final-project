import React from "react";
import "./HeroSection.css";
import { motion } from "framer-motion";
import Button from "./button";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-box">
        <div className="hero-text">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero-heading"
          >
            Master Cyber Defense.<br />Simulate. Learn. Conquer.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hero-subtext"
          >
            Experience real-world cyberattacks in a safe environment.<br />
            Simulate ransomware, phishing, DDoS, malware, and more.<br />
            Build your skills. Strengthen your defenses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Button label="Start Your Training" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
