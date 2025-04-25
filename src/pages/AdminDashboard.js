import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore"; // Add addDoc for saving data
import emailjs from "emailjs-com";
import PhishingLogsViewer from "../components/PhishingLogsViewer"; // 👈 Import it

const categories = [
  { name: "Phishing", path: "Phishing simulation" },
  { name: "Malware", path: "Malware simulation" },
  { name: "Ransomware", path: "Ransomware simulation" },
  { name: "DDoS", path: "ddoS simulation" },
  { name: "Packet Sniffing", path: "Packet sniffing simulation" },
  { name: "Phishing Logs", path: null }, // 👈 Sidebar tab for user activity logs
];

const AdminDashboard = () => {
  const [requests, setRequests] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  useEffect(() => {
    const unsubscribers = categories
      .filter((cat) => cat.path)
      .map((cat) =>
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
    const trackingLink = `https://pa-saan.github.io/cyberedge/?email=${encodeURIComponent(email)}&type=${encodeURIComponent(simulationType)}`;

    const templateParams = {
      to_email: email,
      from_name: "CyberSim Admin",
      message: `
        This is a simulated attack of type: ${simulationType}
        Please <a href="${trackingLink}" target="_blank">click here to verify your account</a>.
        This is part of a cybersecurity awareness simulation.
      `,
      simulation_type: simulationType,
    };

    try {
      const result = await emailjs.send(
        "service_qkvl0dj",
        "template_4hx5zg5",
        templateParams,
        "7suCieRVZzpqHVBWT"
      );
      console.log("✅ Email sent:", result.text);
      alert(`✅ Simulation email sent to ${email}`);

      // Save the email to Firebase after sending it
      await addDoc(collection(db, "sent_simulations"), {
        email: email,
        simulationType: simulationType,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("❌ Email failed:", error);
      alert("❌ Email sending failed. Check console.");
    }
  };

  const renderDetails = () => {
    if (selectedCategory === "Phishing Logs") {
      return <PhishingLogsViewer />;
    }

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
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Simulation Type:</strong> {req.simulationType}</p>
                <p><strong>Status:</strong> {req.status}</p>
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
              backgroundColor: selectedCategory === cat.name ? "#32cd32" : "#e0f2e0",
              color: selectedCategory === cat.name ? "#fff" : "#000",
            }}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
            {cat.path && (
              <span style={styles.badge}>{requests[cat.name]?.length || 0}</span>
            )}
          </div>
        ))}
      </div>

      <div style={styles.content}>{renderDetails()}</div>
    </div>
  );
};

const styles = {
  wrapper: { display: "flex", minHeight: "100vh", fontFamily: "Segoe UI", backgroundColor: "#F5F7FA" },
  sidebar: { width: "240px", backgroundColor: "#f1f1f1", padding: "20px", borderRight: "1px solid #ddd" },
  sidebarTitle: { fontSize: "20px", marginBottom: "20px", fontWeight: "bold" },
  sidebarItem: { padding: "12px 15px", marginBottom: "12px", borderRadius: "8px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" },
  badge: { backgroundColor: "#FF6F00", borderRadius: "16px", padding: "2px 10px", fontSize: "12px", fontWeight: "bold", color: "#fff" },
  content: { flex: 1, padding: "40px" },
  details: { maxWidth: "700px", margin: "0 auto" },
  detailsTitle: { fontSize: "26px", marginBottom: "25px", fontWeight: "600" },
  noData: { fontStyle: "italic", color: "#999" },
  list: { listStyle: "none", padding: 0 },
  listItem: { backgroundColor: "#fff", padding: "20px", marginBottom: "15px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", borderLeft: "4px solid #32cd32" },
  button: { marginTop: "10px", padding: "10px 18px", backgroundColor: "#32cd32", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" },
};

export default AdminDashboard;
