import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaChalkboardTeacher, FaLaptopCode, FaUserCircle } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Navbar.css";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            if (data.name) {
              setUserName(data.name);
            }
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      }
    });
  
    return () => unsubscribe(); // cleanup
  }, []);

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
          <button className="dropdown-button">
            <IoIosArrowDropdown /> Services
          </button>
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

        {userName && (
          <li className="user-info">
            <FaUserCircle className="user-icon" />
            <span className="user-firstname">{userName}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
