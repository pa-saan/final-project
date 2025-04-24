import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const PhishingLogsViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PhishingLogs"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>📋 Phishing Activity Logs</h2>
      {logs.length === 0 ? (
        <p>No clicks logged yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={cellHead}>Email</th>
              <th style={cellHead}>Simulation Type</th>
              <th style={cellHead}>Clicked At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td style={cellBody}>{log.email}</td>
                <td style={cellBody}>{log.simulationType}</td>
                <td style={cellBody}>{new Date(log.clickedAt.seconds * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const cellHead = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#32cd32",
  color: "white",
  fontWeight: "bold",
};

const cellBody = {
  border: "1px solid #ccc",
  padding: "10px",
};

export default PhishingLogsViewer;
