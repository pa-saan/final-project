import React from "react";
import "./simubuttons.css"; // Import external CSS
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="features-container">
      <h2 className="typewriter">Start Simulation</h2>

      <p className="features-subtitle">simply click on the start simulation button to start.</p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="icon">⚡</div>
          <h3> Phishing Simulation</h3>
          <p>Optimized for speed and performance across all devices and platforms.</p>
          <Link to="/Phishing">
        <button className="button">Start Simulation</button>
      </Link>
        </div>

        <div className="feature-card">
          <div className="icon">📦</div>
          <h3> Ransomware Simulation</h3>
          <p>Flexible components that adapt to your specific business needs.</p>
          <Link to="/Ransomware">
        <button className="button">Start Simulation</button>
      </Link>
        </div>

        <div className="feature-card">
          <div className="icon">🌍</div>
          <h3> DDoS Simulation</h3>
          <p>Connect with customers worldwide with our distributed network.</p>
          <Link to="/DDos">
        <button className="button">Start Simulation</button>
      </Link>
        </div>

        <div className="feature-card">
          <div className="icon">👨‍💻</div>
          <h3> Packet Sniffing Simulation</h3>
          <p>Built with the latest technologies for seamless integration.</p>
          <Link to="/PacketSniffing">
        <button className="button">Start Simulation</button>
      </Link>
        </div>

        <div className="feature-card">
          <div className="icon">👨‍💻</div>
          <h3> Malware Infection Demo</h3>
          <p>Built with the latest technologies for seamless integration.</p>
          <Link to="/Malweare">
        <button className="button">Start Simulation</button>
      </Link>
        </div>

      </div>
    </div>
  );
};

export default Features;
