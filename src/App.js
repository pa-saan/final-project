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
import Dashborde from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/About" element={<About />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Dashborde" element={<Dashborde/>} />
        <Route path="/Learning" element={<Learning/>} />
        <Route path="/Training" element={<Training/>} />
        <Route path="/Simulation" element={<Simulation/>} />
      </Routes>
    </Router>
  );
}

export default App;
