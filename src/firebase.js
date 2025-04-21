// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqUpk3YFH81xGkdnKwOmWHMpt0aw9RNvg",
  authDomain: "cyberedge-lab.firebaseapp.com",
  projectId: "cyberedge-lab",
  storageBucket: "cyberedge-lab.firebasestorage.app",
  messagingSenderId: "783335288469",
  appId: "1:783335288469:web:644d3626f4f7811c34b59c",
  measurementId: "G-KDY343F4VP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // 🔥 Firestore initialized
const auth = getAuth(app);    // 🔐 Auth initialized

// ✅ Export both
export { db, auth };
