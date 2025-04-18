import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Services from "./pages/Services";
import About from "./pages/About";
import Help from "./pages/Help";
import Home from "./pages/Homepage";
import Training from "./pages/training";
import Learning from "./pages/learning";
import Simulation from "./pages/simulation";
import Dashboard from "./pages/dashboard";
import Ransomware from "./pages/ransomweare";
import DDoS from "./pages/ddos";
import PacketSniffing from "./pages/packet";
import Malweare from "./pages/malweare";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import Signup from "./pages/signup";
import AdminDashboard from "./pages/AdminDashboard";
import Phishing from "./pages/PhishingSimulationPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/About" element={<About />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Learning" element={<Learning/>} />
        <Route path="/Training" element={<Training/>} />
        <Route path="/Simulation" element={<Simulation/>} />
        <Route path="/Phishing" element={<Phishing/>} />
        <Route path="/Ransomware" element={<Ransomware/>} />
        <Route path="/DDOs" element={<DDoS/>} />
        <Route path="/PacketSniffing" element={<PacketSniffing/>} />
        <Route path="/Malweare" element={<Malweare/>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AdminDashboard" element={< AdminDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
