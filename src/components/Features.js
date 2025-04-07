import React from "react";
import "./Features.css"; // Import external CSS

const Features = () => {
  return (
    <div className="features-container">
      <h2 className="features-title">Powerful Features</h2>
      <p className="features-subtitle">Everything you need to build exceptional cybersecurity training experiences.</p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>Optimized for speed and performance across all devices and platforms.</p>
        </div>

        <div className="feature-card">
          <div className="icon">📦</div>
          <h3>Modular Design</h3>
          <p>Flexible components that adapt to your specific business needs.</p>
        </div>

        <div className="feature-card">
          <div className="icon">🌍</div>
          <h3>Global Reach</h3>
          <p>Connect with customers worldwide with our distributed network.</p>
        </div>

        <div className="feature-card">
          <div className="icon">👨‍💻</div>
          <h3>Developer Friendly</h3>
          <p>Built with the latest technologies for seamless integration.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
