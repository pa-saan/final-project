import React from 'react';
import './SiriLine.css';

const SiriLine = () => {
  return (
    <div className="siri-container">
      <svg className="siri-wave" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path className="wave wave1" d="M0 10 Q 10 5, 20 10 T 40 10 T 60 10 T 80 10 T 100 10" />
        <path className="wave wave2" d="M0 10 Q 10 10, 20 10 T 40 10 T 60 10 T 80 10 T 100 10" />
        <path className="wave wave3" d="M0 10 Q 10 15, 20 10 T 40 10 T 60 10 T 80 10 T 100 10" />
      </svg>
    </div>
  );
};

export default SiriLine;
