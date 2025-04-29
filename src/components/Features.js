import React from "react";
import "./Features.css"; // Import external CSS
import { FaBolt, FaCubes, FaGlobe, FaUserShield } from "react-icons/fa"; // Import real icons

const Features = () => {
  return (
    <div className="features-container">
      <h2 className="features-title">Powerful Features</h2>
      <p className="features-subtitle">
        Everything you need to build exceptional cybersecurity training experiences.
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="icon">
            <FaBolt />
          </div>
          <h3>Lightning Fast</h3>
          <p>Optimized for speed and performance across all devices and platforms.</p>
        </div>

        <div className="feature-card">
          <div className="icon">
            <FaCubes />
          </div>
          <h3>Modular Design</h3>
          <p>Flexible components that adapt to your specific cybersecurity training needs.</p>
        </div>

        <div className="feature-card">
          <div className="icon">
            <FaGlobe />
          </div>
          <h3>Global Reach</h3>
          <p>Connect with cybersecurity professionals worldwide with our distributed simulation network.</p>
        </div>

        <div className="feature-card">
          <div className="icon">
            <FaUserShield />
          </div>
          <h3>Security Focused</h3>
          <p>Built with cybersecurity best practices for realistic, safe simulations.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
