import React from "react";
import "./Testimonials.css"; // Import external CSS

const testimonials = [
  {
    quote:
      "This platform has completely transformed how we approach our digital strategy. The results have been incredible.",
    name: "Alex Johnson",
    role: "Marketing Director",
  },
  {
    quote:
      "The ease of use combined with powerful features makes this the perfect solution for our growing business.",
    name: "Sarah Chen",
    role: "CEO, TechStart",
  },
  {
    quote:
      "We've seen a 200% increase in engagement since implementing this platform. Highly recommended!",
    name: "Michael Rodriguez",
    role: "Product Manager",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">What Our Clients Say</h2>
      <p className="testimonials-subtitle">
        Don't just take our word for it
      </p>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <span className="quote-icon">"</span>
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
