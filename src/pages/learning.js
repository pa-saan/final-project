import React, { useState } from "react";
import "./Learning.css";

const courses = [
  { id: 1, title: "Cybersecurity Basics", category: "Cybersecurity", progress: 40, thumbnail: "https://source.unsplash.com/200x100/?cybersecurity" },
  { id: 2, title: "Malware Analysis", category: "Malware", progress: 70, thumbnail: "https://source.unsplash.com/200x100/?malware" },
  { id: 3, title: "Phishing Attacks & Prevention", category: "Phishing Attacks & Prevention", progress: 25, thumbnail: "https://source.unsplash.com/200x100/?phishing" },
  { id: 4, title: "DDos", category: "DDos", progress: 0, thumbnail: "https://source.unsplash.com/200x100/?DDos" },
];

const Learning = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = selectedCategory === "All" ? courses : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="learning-container">
      <aside className="sidebar">
        <h2>Categories</h2>
        <ul>
          <li onClick={() => setSelectedCategory("All")}>All Courses</li>
          <li onClick={() => setSelectedCategory("Malware")}>Malware</li>
          <li onClick={() => setSelectedCategory("Phishing Attacks & Prevention")}>Phishing Attacks</li>
          <li onClick={() => setSelectedCategory("DDos")}>Networking</li>
        </ul>
      </aside>

      <main className="course-list">
        <h1>Your Learning</h1>
        <div className="courses">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <img src={course.thumbnail} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.category}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${course.progress}%` }}></div>
              </div>
              <p>{course.progress}% completed</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Learning;
