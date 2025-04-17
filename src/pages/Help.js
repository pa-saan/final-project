import React, { useEffect, useState } from "react";

const HelpPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className={`help-container ${showContent ? "fade-in" : ""}`}>
      {/* Internal CSS */}
      <style>{`
        .help-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          color: #2c3e50;
          background-color: #f9fbfe;
          transition: opacity 1s ease;
          opacity: 0;
        }

        .help-container.fade-in {
          opacity: 1;
        }

        .help-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 2rem;
          color: #3b82f6;
          text-align: center;
          animation: fadeDown 0.8s ease-in-out;
        }

        .guide-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease-in-out;
        }

        .guide-title {
          font-size: 1.6rem;
          margin-bottom: 1rem;
          color: #111827;
          border-left: 6px solid #3b82f6;
          padding-left: 12px;
        }

        .guide-steps {
          list-style: decimal inside;
          padding-left: 1rem;
          line-height: 1.8;
          font-size: 1rem;
          color: #374151;
        }

        .guide-steps ul {
          list-style: disc;
          margin-left: 1.5rem;
          margin-top: 0.5rem;
        }

        .tip-note {
          margin-top: 1.5rem;
          font-style: italic;
          font-size: 0.95rem;
          color: #6b7280;
        }

        .image-section {
          text-align: center;
          animation: fadeInUp 1.3s ease-in-out;
        }

        .guide-image {
          max-width: 100%;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
          transition: transform 0.3s ease;
        }

        .guide-image:hover {
          transform: scale(1.02);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header */}
      <h1 className="help-title">🛡️ Cyber Simulation Help Guide</h1>

      {/* Step-by-Step Guide */}
      <div className="guide-card">
        <h2 className="guide-title">🚀 How to Start a Simulation</h2>
        <ol className="guide-steps">
          <li>Login to the system using your credentials.</li>
          <li>Go to the <strong>Simulation Dashboard</strong>.</li>
          <li>Click <strong>“Start New Simulation”</strong>.</li>
          <li>Select the <strong>Attack Type</strong>.</li>
          <li>Choose the <strong>Target Environment</strong>.</li>
          <li>Configure the <strong>Simulation Parameters</strong>:
            <ul>
              <li>Duration</li>
              <li>Attack Intensity</li>
              <li>Custom Payloads (optional)</li>
            </ul>
          </li>
          <li>Click <strong>Start Simulation</strong>.</li>
          <li>Watch real-time simulation feedback.</li>
          <li>Analyze results in the <strong>Reports</strong> section.</li>
        </ol>
        <p className="tip-note">💡 You can run multiple simulations in parallel!</p>
      </div>

      {/* Graphical Map */}
      <div className="image-section">
        <h2 className="guide-title">🗺️ Visual Flow of the Simulation</h2>
        <img
          src="/images/simulation-flow.png"
          alt="Simulation Flow"
          className="guide-image"
        />
      </div>
    </div>
  );
};

export default HelpPage;
