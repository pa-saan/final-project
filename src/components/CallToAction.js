import React from "react";
import "./CallToAction.css"; // Import external CSS

const CallToAction = () => {
  return (
    <div className="cta-container">
      <h2 className="cta-title">
        Ready to dive in?
      </h2>
      <p className="cta-subtitle">
        Experience real-world cybersecurity threats in a safe and controlled environment with our simulation and training platform.
      </p>
      
      <div className="cta-buttons">
        <button className="cta-primary">Get Started Today</button>
        <button className="cta-secondary">Schedule a Demo</button>
      </div>

   
    </div>
  );
};

export default CallToAction;
