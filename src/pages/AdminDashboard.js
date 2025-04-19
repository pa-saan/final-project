import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const categories = [
  { name: "Phishing", path: "Phishing simulation" },
  { name: "Malware", path: "Malware simulation" },
  { name: "Ransomware", path: "Ransomware simulation" },
  { name: "DDoS", path: "ddoS simulation" },
  { name: "Packet Sniffing", path: "Packet sniffing simulation" },
];

const AdminDashboard = () => {
  const [requests, setRequests] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  useEffect(() => {
    const unsubscribers = categories.map((cat) =>
      onSnapshot(collection(db, cat.path), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests((prev) => ({ ...prev, [cat.name]: data }));
      })
    );

    return () => unsubscribers.forEach((unsub) => unsub());
  }, []);

  const renderDetails = () => {
    const data = requests[selectedCategory] || [];

    return (
      <div style={styles.details}>
        <h2 style={styles.detailsTitle}>{selectedCategory} Requests</h2>
        {data.length === 0 ? (
          <p style={styles.noData}>No requests found for {selectedCategory}.</p>
        ) : (
          <ul style={styles.list}>
            {data.map((req) => (
              <li key={req.id} style={styles.listItem}>
                <p><strong>Email:</strong> {req.email || "Anonymous"}</p>
                <p><strong>Time:</strong> {req.timestamp?.seconds ? new Date(req.timestamp.seconds * 1000).toLocaleString() : "N/A"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Attack Types</h3>
        {categories.map((cat) => (
          <div
            key={cat.name}
            style={{
              ...styles.sidebarItem,
              backgroundColor: selectedCategory === cat.name ? " #32cd32" : "hsl(120, 25.90%, 89.40%)",
              color: selectedCategory === cat.name ? "#fff" : "#000",
            }}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
            <span style={styles.badge}>
              {requests[cat.name]?.length || 0}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.content}>{renderDetails()}</div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#F5F7FA",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "rgb(241, 241, 241)", // Deep indigo
    padding: "20px",
    color: "black",
    borderRight: "1px solid #ddd",
  },
  sidebarTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  sidebarItem: {
    padding: "12px 15px",
    marginBottom: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff20", // translucent white
    transition: "all 0.3s ease",
  },
  badge: {
    backgroundColor: "#FF6F00", // orange accent
    borderRadius: "16px",
    padding: "2px 10px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#F5F7FA",
  },
  details: {
    maxWidth: "700px",
    margin: "0 auto",
  },
  detailsTitle: {
    fontSize: "26px",
    marginBottom: "25px",
    fontWeight: "600",
    color: "rgb(54, 54, 54)", // main indigo
  },
  noData: {
    fontStyle: "italic",
    color: "#999",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    borderLeft: "4px solid #32cd32",
  },
};


export default AdminDashboard;
