import React from "react";

import "../../css/Hero.css";

import HeroImage from "../../assets/Li.png";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-container">
      {/* LEFT CONTENT */}

      <div className="hero-content">
        <span>#1 Online Learning Platform</span>

        <h1>Master New Skills Anytime, Anywhere</h1>

        <p>
          Learn from industry experts with practical courses designed to boost
          your career and skills.
        </p>

        <div className="hero-buttons">
          <Link to="/courses" className="hero-btn">
            Browse Courses
          </Link>

          <a
            href='#popular-categories'
            className="hero-outline-btn"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* RIGHT IMAGE */}

      <div className="hero-image">
        <img src={HeroImage} alt="Learning" />
      </div>
    </div>
  );
};

export default Hero;
