import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Firebase Auth for current user

const PhishingSimulationPage = () => {
  const [agreed, setAgreed] = useState(false);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [progress, setProgress] = useState(40);

  const handleStartSimulation = async () => {
    if (agreed) {
      setSimulationStarted(true);
      console.log("Phishing simulation started...");

      const auth = getAuth();
      const user = auth.currentUser;
      const userEmail = user?.email || "unknown";

      try {
        await addDoc(collection(db, "Phishing simulation"), {
          email: userEmail,
          simulationType: "Phishing",
          status: "pending",
          timestamp: serverTimestamp(),
        });
        console.log("Simulation request successfully sent to Firebase!");
      } catch (error) {
        console.error("Error sending simulation request:", error);
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Phishing Simulation</h2>

      {!simulationStarted ? (
        <div style={styles.card}>
          <p style={styles.description}>
            Before starting the phishing simulation, please review and agree to
            our terms and conditions. This simulation is designed for
            educational purposes only and helps users recognize and avoid
            phishing attacks in a safe environment.
          </p>

          <label style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span style={styles.checkboxLabel}>
              I agree to the terms and conditions of this simulation.
            </span>
          </label>

          <button
            onClick={handleStartSimulation}
            disabled={!agreed}
            style={{
              ...styles.button,
              backgroundColor: agreed ? "#4caf50" : "#aaa",
              cursor: agreed ? "pointer" : "not-allowed",
            }}
          >
            Start Simulation
          </button>
        </div>
      ) : (
        <div style={styles.simulation}>
          <h3>Simulation In Progress...</h3>
          <p>Simulation request sent successfully ✅</p>
        </div>
      )}

      <div style={styles.progressContainer}>
        <span>Learning Progress</span>
        <div style={styles.progressBarWrapper}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
        <span>{progress}%</span>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f9f9f9",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    textAlign: "center",
  },
  description: {
    fontSize: "16px",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  checkboxContainer: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
  },
  checkboxLabel: {
    cursor: "pointer",
  },
  button: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    transition: "0.3s",
  },
  simulation: {
    textAlign: "center",
    marginTop: "40px",
  },
  progressContainer: {
    marginTop: "60px",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  progressBarWrapper: {
    height: "16px",
    backgroundColor: "#ddd",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "10px 0",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 0.4s ease",
  },
};

export default PhishingSimulationPage;
