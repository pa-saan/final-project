// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "simulation_requests"),
      (snapshot) => {
        const requestData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestData);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard - Phishing Requests</h2>
      {requests.length === 0 ? (
        <p style={styles.noData}>No simulation requests yet.</p>
      ) : (
        <ul style={styles.list}>
          {requests.map((req) => (
            <li key={req.id} style={styles.listItem}>
              <p><strong>Email:</strong> {req.email || "Anonymous"}</p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {req.timestamp?.seconds
                  ? new Date(req.timestamp.seconds * 1000).toLocaleString()
                  : "No timestamp"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f1f1f1",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  noData: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#777",
  },
  list: {
    listStyle: "none",
    padding: 0,
    maxWidth: "600px",
    margin: "0 auto",
  },
  listItem: {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};

export default AdminDashboard;
