import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import emailjs from "emailjs-com";

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

  const handleSendSimulation = async (email, simulationType) => {
    if (!email || !simulationType) {
      alert("❌ Missing email or simulation type.");
      return;
    }

    const templateParams = {
      to_email: email,
      from_name: "CyberSim Admin",
      message: `This is a simulated cyber attack of type: ${simulationType}`,
      simulation_type: simulationType,
    };

    console.log("📤 Sending simulation to:", email);

    try {
      const result = await emailjs.send(
        "service_qkvl0dj",        // Replace with your EmailJS Service ID
        "template_4hx5zg5",       // Replace with your EmailJS Template ID
        templateParams,
        "7suCieRVZzpqHVBWT"       // Replace with your EmailJS Public Key
      );
      console.log("✅ EmailJS response:", result.text);
      alert(`✅ Simulation email sent to ${email}`);
    } catch (error) {
      console.error("❌ EmailJS send failed:", error);
      alert("❌ Failed to send email. Check the console for more info.");
    }
  };

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
                <p><strong>Email:</strong> {req.email || "N/A"}</p>
                <p><strong>Simulation Type:</strong> {req.simulationType || "N/A"}</p>
                <p><strong>Status:</strong> {req.status || "N/A"}</p>
                <p><strong>Time:</strong> 
                  {req.timestamp?.seconds
                    ? new Date(req.timestamp.seconds * 1000).toLocaleString()
                    : "N/A"}
                </p>
                <button
                  style={styles.button}
                  onClick={() => handleSendSimulation(req.email, selectedCategory)}
                >
                  Send Simulation
                </button>
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
              backgroundColor: selectedCategory === cat.name ? "#32cd32" : "hsl(120, 25.90%, 89.40%)",
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
    backgroundColor: "rgb(241, 241, 241)",
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
    backgroundColor: "#ffffff20",
    transition: "all 0.3s ease",
  },
  badge: {
    backgroundColor: "#FF6F00",
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
    color: "rgb(54, 54, 54)",
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
  button: {
    marginTop: "10px",
    padding: "10px 18px",
    backgroundColor: "#32cd32",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "0.3s ease",
  },
};

export default AdminDashboard;
