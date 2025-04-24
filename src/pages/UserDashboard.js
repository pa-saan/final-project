import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBook, FaLaptopCode } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { db } from "../firebase"; // ✅ Make sure your firebase config is correct
import { collection, query, where, getDocs } from "firebase/firestore";

function App() {
  const [activeSection, setActiveSection] = useState("learning");
  const [sections, setSections] = useState({
    learning: [],
    training: [],
    simulation: [],
  });
  const [loading, setLoading] = useState(true);

  const courseMap = {
    1: "Cybersecurity Basics",
    2: "Malware Analysis",
    3: "Phishing Attacks & Prevention",
    4: "DDos",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, "UserProgress"),
          where("email", "==", user.email)
        );
        const snapshot = await getDocs(q);

        const learningData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            title: courseMap[data.courseId] || `Course ${data.courseId}`,
            progress: data.progress,
          };
        });

        setSections({
          learning: learningData,
          training: [],
          simulation: [],
        });
      } catch (error) {
        console.error("❌ Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goToSection = (section) => {
    setActiveSection(section);
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading Dashboard...</p>;

  return (
    <div>
      <style>{`
        body {
          margin: 0;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(-45deg,rgb(89, 189, 101),rgb(186, 216, 189),rgb(145, 172, 148),rgb(89, 189, 101));
          background-size: 400% 400%;
          animation: gradientBG 8s ease infinite;
          color: #333333;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .sidebar { width: 250px; height: 100vh; background-color:rgb(241, 241, 241); box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1); position: fixed; padding: 20px; }
        .sidebar h1 { font-size: 24px; margin-bottom: 40px; color:rgb(58, 58, 58); }
        .sidebar ul { list-style: none; padding: 0; }
        .sidebar li { padding: 10px; margin-bottom: 10px; cursor: pointer; border-radius: 5px; transition: background-color 0.3s; color:rgb(59, 59, 59); }
        .sidebar li:hover { background-color: #f0f0f0; }
        .main-content { margin-left: 270px; padding: 40px; }
        .main-content h1 { font-size: 28px; margin-bottom: 30px; text-transform: capitalize; color:rgb(0, 0, 0); }
        .card-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .card { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); transition: box-shadow 0.3s; }
        .card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
        .card h3 { font-size: 18px; margin-bottom: 15px; color: #222; }
        .progress-bar { width: 100%; background-color: #ddd; border-radius: 5px; height: 10px; overflow: hidden; }
        .progress-fill { height: 100%; background-color: #32cd32; transition: width 0.3s; }
        .progress-text { font-size: 14px; color: #666; margin-top: 10px; }
        .chart-container { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); }
        .chart-container h2 { font-size: 20px; margin-bottom: 20px; color:rgb(0, 0, 0); }
        .chart-item { display: flex; align-items: center; margin-bottom: 15px; }
        .chart-label { width: 150px; font-size: 14px; color: #555; }
        .chart-bar { flex: 1; background-color: #ddd; border-radius: 5px; height: 16px; margin: 0 15px; overflow: hidden; }
        .chart-fill { height: 100%; background-color: #32cd32; }
        .chart-value { font-size: 14px; color: #666; }
        .section-buttons { margin-top: 30px; gap: 100px; }
        .section-buttons button { color: white; background-color: #32cd32; border: none; border-radius: 30px; padding: 12px 24px; font-size: 15px; font-weight: 300; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; gap: 100px; flex-wrap: wrap; }
        .section-buttons button:hover { background-color: rgb(150, 250, 0); box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15); transform: translateY(-2px); }
        .brand { color:rgb(134, 134, 134); font-size: 80px; font-weight: bold; text-align: center; }
        @media (max-width: 768px) {
          .sidebar { width: 200px; }
          .main-content { margin-left: 220px; padding: 20px; }
          .card-container { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sidebar">
        <h1>CyberSec Platform</h1>
        <ul>
          <motion.li onClick={() => goToSection("training")} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <FaUsers /> Training
          </motion.li>
          <motion.li onClick={() => goToSection("learning")} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <FaBook /> Learning
          </motion.li>
          <motion.li onClick={() => goToSection("simulation")} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <FaLaptopCode /> Simulation
          </motion.li>
        </ul>
      </div>

      <div className="main-content">
        <motion.h1 key={activeSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          {activeSection} Dashboard
        </motion.h1>

        <motion.div className="card-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          {sections[activeSection]?.map((item, index) => (
            <motion.div key={index} className="card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <h3>{item.title}</h3>
              <div className="progress-bar">
                <motion.div className="progress-fill" style={{ width: `${item.progress}%` }} initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} transition={{ duration: 0.5 }}></motion.div>
              </div>
              <p className="progress-text">{item.progress}% Complete</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="chart-container">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Progress Overview</motion.h2>
          {sections[activeSection]?.map((item, index) => {
            const maxProgress = Math.max(...sections[activeSection].map((i) => i.progress || 0));
            return (
              <motion.div key={index} className="chart-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                <span className="chart-label">{item.title}</span>
                <div className="chart-bar">
                  <div className="chart-fill" style={{ width: `${(item.progress / maxProgress) * 100}%` }}></div>
                </div>
                <span className="chart-value">{item.progress}%</span>
              </motion.div>
            );
          })}
        </div>

        <div className="section-buttons">
          <button onClick={() => goToSection("training")}>Go to Training</button>
          <button onClick={() => goToSection("learning")}>Go to Learning</button>
          <button onClick={() => goToSection("simulation")}>Go to Simulation</button>
        </div>
      </div>

      <h1 className="brand">CyberEdge Lab</h1>
    </div>
  );
}

export default App;
