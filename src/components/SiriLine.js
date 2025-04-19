import React from 'react';
import './SiriLine.css';

const SiriLine = () => {
  return (
    <div>
    <p style={styles.privacyText}>
    <strong>We Care About Your Privacy</strong>
    <br />
    Your privacy matters to us. We are committed to protecting your personal
    information and ensuring your data is handled securely. Any information
    you provide is used only to enhance your experience and is never shared
    without your consent.
  </p>
    <div className="siri-container">
      <svg className="siri-wave" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path className="wave wave1" d="M0 10 Q 10 5, 20 10 T 40 10 T 60 10 T 80 10 T 100 10" />
        <path className="wave wave2" d="M0 10 Q 10 10, 20 10 T 40 10 T 60 10 T 80 10 T 100 10" />
        <path className="wave wave3" d="M0 10 Q 10 15, 20 10 T 40 10 T 60 10 T 80 10 T 100 10" />
      </svg>
    </div>
    </div>
  );
};
const styles = {
  privacyText: {
    marginTop: "200px",
    fontSize: "14px",
    color: "#555",
    maxWidth: "600px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.6",
  },
}
export default SiriLine;
