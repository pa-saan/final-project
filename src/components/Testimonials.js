import React from "react";
import "./Testimonials.css"; // Import external CSS
import { FaQuoteLeft } from "react-icons/fa"; // Using a real quote icon

const testimonials = [
  {
    quote:
      "CyberEdge Labs gave our team hands-on experience against real-world cyber threats. Our incident response skills have improved dramatically.",
    name: "Emily Carter",
    role: "Chief Information Security Officer (CISO)",
  },
  {
    quote:
      "Thanks to CyberEdge Labs' training simulations, our employees are now far better prepared to recognize and respond to phishing attacks.",
    name: "Daniel Kim",
    role: "Cybersecurity Awareness Lead",
  },
  {
    quote:
      "The realistic DDoS and ransomware exercises provided by CyberEdge Labs helped our IT department strengthen our defensive strategies.",
    name: "Priya Singh",
    role: "Network Security Engineer",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">Trusted by Cybersecurity Professionals</h2>
      <p className="testimonials-subtitle">
        Real results from real training experiences
      </p>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <FaQuoteLeft className="quote-icon" />
            <p className="testimonial-text">
              <em>{testimonial.quote}</em>
            </p>
            <h4 className="testimonial-name">{testimonial.name}</h4>
            <p className="testimonial-role">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
