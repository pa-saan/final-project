import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaChalkboardTeacher, FaLaptopCode } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import "./Navbar.css";

const Navbar = ({ userName }) => {  // Add userName as a prop
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link className="logo" to="/">Cyber Safe</Link>
      <ul className="nav-links">
        <li 
          className="dropdown-wrapper"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="dropdown-button"><IoIosArrowDropdown /> Services </button>
          {dropdownOpen && (
            <ul className="dropdown">
              <li>
                <Link to="/dashboard">
                  <FaTachometerAlt className="icon" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/learning">
                  <FaBook className="icon" /> Learning
                </Link>
              </li>
              <li>
                <Link to="/training">
                  <FaChalkboardTeacher className="icon" /> Training
                </Link>
              </li>
              <li>
                <Link to="/simulation">
                  <FaLaptopCode className="icon" /> Simulation
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Help">Help</Link></li>
        {/* Display User's Name in the Top Right */}
        <li className="user-name">{userName}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
