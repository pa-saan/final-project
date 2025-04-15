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
import Phishing from "./pages/phishing";
import Ransomware from "./pages/ransomweare";
import DDoS from "./pages/ddos";
import PacketSniffing from "./pages/packet";
import Malweare from "./pages/malweare";


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
      </Routes>
    </Router>
  );
}

export default App;
