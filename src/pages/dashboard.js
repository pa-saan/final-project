import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { color, motion } from "framer-motion";

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
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.animatedBackground}></div>

      {/* Motion Blobs */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        style={{ ...styles.blob, ...styles.blob1 }}
      />
      <motion.div
        initial={{ y: 200, opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        style={{ ...styles.blob, ...styles.blob2 }}
      />
      <motion.div
        initial={{ x: 100, y: 100, opacity: 0.5 }}
        animate={{ x: -50, y: -50, opacity: 1 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        style={{ ...styles.blob, ...styles.blob3 }}
      />

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
            transition={{ delay: 0.6}}
          >
            <FaUserPlus style={styles.iconStyle} />
            <h3 style={styles.cardTitle}>Register</h3>
            <p style={styles.cardDesc}>Click here to Register</p>
          </motion.div>
        </div>
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
  },
  animatedBackground: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    background: "linear-gradient(-45deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb)",
    backgroundSize: "400% 400%",
    animation: "morphGradient 20s ease infinite",
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
    color: "rgb(78, 80, 77)",
    marginBottom: "40px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
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
    color: "#32cd32", // Soft purple
  },
  blob: {
    position: "absolute",
    width: "300px",
    height: "300px",
    filter: "blur(100px)",
    borderRadius: "50%",
    zIndex: "80%",
  },
  blob1: {
    top: "10%",
    left: "10%",
    background: "linear-gradient(45deg, #ff9a9e, #fad0c4)", // pink to peach
    zIndex: "80%",
  },
  blob2: {
    bottom: "15%",
    right: "20%",
    background: "linear-gradient(45deg,rgb(211, 172, 42), #c2e9fb)", // sky blue to light teal
 
  },
  blob3: {
    top: "50%",
    left: "60%",
    background: "linear-gradient(45deg, #fbc2eb,rgb(204, 155, 20))", // lavender to soft blue
  
  },
};


export default Dashboard;
