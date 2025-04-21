import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import SiriLine from "../components/SiriLine";
import Simulationbutton from "../components/simubuttons";
import Preloader from "../components/preloader";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
      @keyframes morphGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(styleSheet);
  
    const audio = new Audio("/welcome.mp3");
    audio.volume = 1;
  
    let playTimeout;
    let stopTimeout;
  
    // ⏳ Delay before playing
    playTimeout = setTimeout(() => {
      audio.play().catch((error) => {
        console.warn("Autoplay failed:", error.message);
      });
  
      // ⏹️ Stop after 5 seconds
      stopTimeout = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 2300);
    }, 500);
  
    // 🔁 Cleanup
    return () => {
      clearTimeout(playTimeout);
      clearTimeout(stopTimeout);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  
  
  

  return (
    <div style={styles.wrapper}>
      <div style={styles.animatedBackground}></div>

      <div style={styles.container}>
        <motion.h2
          style={styles.title}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Dashboard will appear after you log in
        </motion.h2>

        <div style={styles.cardContainer}>
          <motion.div
            onClick={() => navigate("/user-login")}
            style={styles.card}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FaUser style={styles.iconStyle} />
            <h3 style={styles.cardTitle}>User Login</h3>
            <p style={styles.cardDesc}>Click here to login as User</p>
          </motion.div>

          <motion.div
            onClick={() => navigate("/admin-login")}
            style={styles.card}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FaUserShield style={styles.iconStyle} />
            <h3 style={styles.cardTitle}>Admin Login</h3>
            <p style={styles.cardDesc}>Click here to login as Admin</p>
          </motion.div>

          <motion.div
            onClick={() => navigate("/signup")}
            style={styles.card}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <FaUserPlus style={styles.iconStyle} />
            <h3 style={styles.cardTitle}>Register</h3>
            <p style={styles.cardDesc}>Click here to Register</p>
          </motion.div>
        </div>

        <div>
         
            
        </div>

        <SiriLine />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "white",
  },
  container: {
    position: "relative",
    zIndex: 50,
    textAlign: "center",
    paddingTop: "60px",
    paddingBottom: "40px",
  },
  title: {
    fontSize: "30px",
    color: "rgb(17, 17, 17)",
    marginBottom: "40px",
    marginTop: "10px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
    marginTop: "80px",
  },
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
  card: {
    border: "2px solid rgb(255, 255, 255)",
    padding: "30px",
    width: "240px",
    borderRadius: "15px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffffcc",
    color: "black",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  cardTitle: {
    fontSize: "22px",
    margin: "10px 0",
  },
  cardDesc: {
    fontSize: "15px",
    color: "rgb(78, 80, 77)",
  },
  iconStyle: {
    fontSize: "40px",
    color: "#32cd32",
  },
};

export default Dashboard;
