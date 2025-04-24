import React, { useState } from "react";
import "./Learning.css";
import { getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const courses = [
  {
    id: 1,
    title: "Cybersecurity Basics",
    category: "Cybersecurity",
    progress: 0,
    thumbnail: "/video.mp4",
    type: "video",
  },
  {
    id: 2,
    title: "Malware Analysis",
    category: "Malware",
    progress: 70,
    thumbnail: "https://source.unsplash.com/200x100/?malware",
  },
  {
    id: 3,
    title: "Phishing Attacks & Prevention",
    category: "Phishing Attacks & Prevention",
    progress: 25,
    thumbnail: "https://source.unsplash.com/200x100/?phishing",
  },
  {
    id: 4,
    title: "DDos",
    category: "DDos",
    progress: 90,
    thumbnail: "https://source.unsplash.com/200x100/?DDos",
  },
];

const Learning = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videoProgress, setVideoProgress] = useState({});
  const auth = getAuth();
  const user = auth.currentUser;

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const handleVideoProgress = async (id, currentTime, duration) => {
    const percentage = Math.floor((currentTime / duration) * 100);

    setVideoProgress((prev) => ({
      ...prev,
      [id]: percentage,
    }));

    if (!user) return;

    try {
      await setDoc(
        doc(db, "UserProgress", `${user.email}_course_${id}`),
        {
          email: user.email,
          courseId: id,
          progress: percentage,
          lastUpdated: new Date(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("❌ Error saving user progress:", error);
    }
  };

  return (
    <div className="learning-container">
      <aside className="sidebar">
        <h2>Categories</h2>
        <ul>
          <li onClick={() => setSelectedCategory("All")}>All Courses</li>
          <li onClick={() => setSelectedCategory("Malware")}>Malware</li>
          <li onClick={() => setSelectedCategory("Phishing Attacks & Prevention")}>
            Phishing Attacks
          </li>
          <li onClick={() => setSelectedCategory("DDos")}>Networking</li>
        </ul>
      </aside>

      <main className="course-list">
        <h1>Your Learning</h1>
        <div className="courses">
          {filteredCourses.map((course) => {
            const progress =
              course.type === "video"
                ? videoProgress[course.id] || 0
                : course.progress;

            return (
              <div key={course.id} className="course-card">
                {course.type === "video" ? (
                  <video
                    width="100%"
                    height="140"
                    controls
                    onTimeUpdate={(e) =>
                      handleVideoProgress(
                        course.id,
                        e.target.currentTime,
                        e.target.duration
                      )
                    }
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#000",
                      objectFit: "cover",
                    }}
                  >
                    <source src={course.thumbnail} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{
                      borderRadius: "8px",
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <h3>{course.title}</h3>
                <p>{course.category}</p>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p>{progress}% completed</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Learning;
