import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";
import PhishingLogsViewer from "../components/PhishingLogsViewer";

const categories = [
  { name: "Phishing", path: "Phishing simulation" },
  { name: "Malware", path: "Malware simulation" },
  { name: "Ransomware", path: "Ransomware simulation" },
  { name: "DDoS", path: "ddoS simulation" },
  { name: "Packet Sniffing", path: "Packet sniffing simulation" },
  { name: "Phishing Logs", path: null },
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
    if (!email) {
      console.error("❌ Email is missing. Aborting send.");
      alert("❌ Cannot send simulation. Email address is missing!");
      return;
    }

    const trackingLink = `https://pa-saan.github.io/cyberedge/?email=${encodeURIComponent(email)}&type=${encodeURIComponent(simulationType)}`;

    if (simulationType === "Phishing") {
      const templateParams = {
        to_email: email,
        from_name: "CyberSim Admin",
        message: `
         Dear Customer,

          Congratulations!
          
          You have been selected to receive a $100 Amazon Gift Voucher as part of our Customer Loyalty Program.

          To claim your voucher, <a href="${trackingLink}" target="_blank">please click here and fill out the form</a>

          This offer is available for a limited time. Redeem your reward today and enjoy shopping with Amazon!

          Thank you for being a valued customer,
          Amazon Rewards Team
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
        console.log("✅ Phishing email sent:", result.text);
        alert(`✅ Phishing simulation email sent to ${email}`);

        await addDoc(collection(db, "sent_simulations"), {
          email: email,
          simulationType: simulationType,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("❌ Phishing email failed:", error);
        alert("❌ Phishing email sending failed. Check console.");
      }
    }

    if (simulationType === "Malware") {
      const templateParams = {
        to_email: email,
        from_name: "CyberSim Admin",
        message: `
          Dear Customer,

          Congratulations!
          
        `,
        simulation_type: simulationType,
      };

      try {
        const result = await emailjs.send(
          "service_qkvl0dj",
          "template_malware",
          templateParams,
          "7suCieRVZzpqHVBWT"
        );
        console.log("✅ Malware email sent:", result.text);
        alert(`✅ Malware simulation email sent to ${email}`);

        await addDoc(collection(db, "sent_simulations"), {
          email: email,
          simulationType: simulationType,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("❌ Malware email failed:", error);
        alert("❌ Malware email sending failed. Check console.");
      }
    }

    if (simulationType === "Ransomware") {
      const ransomwareTemplateParams = {
        to_email: email,
        from_name: "CyberSim Admin",
        message: `
        As part of our cybersecurity awareness initiative, you have been invited to participate in a controlled ransomware simulation experience.

This simulation will demonstrate how ransomware attacks typically infiltrate systems and encrypt data. Your participation will help you better understand real-world cybersecurity threats and enhance your defensive skills.

Instructions:

Download the simulation application from the following link:
https://github.com/pa-saan/RansomwareSimulationApp

Follow the setup guide provided in the GitHub repository.

Run the application in a safe environment (for example, a virtual machine or an isolated test system) to experience the simulation.

⚠️ Important:

This is a safe educational simulation.

No real harm will occur to your data.

DO NOT run this application on critical or personal systems.

For any questions or support, feel free to contact us.

Stay safe,
CyberEdge Labs
Pioneering Cybersecurity Education
        `,
        simulation_type: simulationType,
      };

      try {
        const result = await emailjs.send(
          "service_qkvl0dj",
          "template_ul5inq1",
          ransomwareTemplateParams,
          "7suCieRVZzpqHVBWT"
        );
        console.log("✅ Ransomware email sent:", result.text);
        alert(`✅ Ransomware simulation email sent to ${email}`);

        await addDoc(collection(db, "sent_ransomware_simulations"), {
          email: email,
          simulationType: simulationType,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("❌ Ransomware email failed:", error);
        alert("❌ Ransomware email sending failed. Check console.");
      }
    }

    if (simulationType === "DDoS") {
      const ddosTemplateParams = {
        to_email: email,
        from_name: "CyberSim Admin",
        message: `
          This is a simulated DDoS attack notification.<br>
          Please stay alert!<br><br>
          This is part of a cybersecurity awareness simulation.
        `,
        simulation_type: simulationType,
      };

      try {
        const result = await emailjs.send(
          "service_qkvl0dj",
          "template_ddos",
          ddosTemplateParams,
          "7suCieRVZzpqHVBWT"
        );
        console.log("✅ DDoS email sent:", result.text);
        alert(`✅ DDoS simulation email sent to ${email}`);

        await addDoc(collection(db, "sent_simulations"), {
          email: email,
          simulationType: simulationType,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("❌ DDoS email failed:", error);
        alert("❌ DDoS email sending failed. Check console.");
      }
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
                <p>
                  <strong>Email:</strong> {req.email || <span style={{ color: "red" }}>Missing Email</span>}
                </p>
                <p><strong>Simulation Type:</strong> {req.simulationType}</p>
                <p><strong>Status:</strong> {req.status}</p>
                <p><strong>Time:</strong> 
                  {req.timestamp?.seconds
                    ? new Date(req.timestamp.seconds * 1000).toLocaleString()
                    : "N/A"}
                </p>
                <button
                  style={{
                    ...styles.button,
                    backgroundColor: req.email ? "#32cd32" : "#ccc",
                    cursor: req.email ? "pointer" : "not-allowed",
                  }}
                  disabled={!req.email}
                  onClick={() => handleSendSimulation(req.email, selectedCategory)}
                >
                  {req.email ? "Send Simulation" : "Invalid Email"}
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
  button: { marginTop: "10px", padding: "10px 18px", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "14px" },
};

export default AdminDashboard;
