import React from "react";
import HeroSection from "../components/Herosection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";

function Homepage() {
    
  return (
    <div>
      <HeroSection />
      <Features/>
      <Testimonials/>
      <CallToAction/>
    </div>
  );
}

export default Homepage;
