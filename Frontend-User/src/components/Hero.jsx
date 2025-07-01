import React from 'react';
import '../css/Hero.css'; // Import your CSS file for styling
import LearningImage from '../assets/Li.png'; // Replace with your image path
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Master New Skills Anytime, Anywhere</h1>
          <p>Explore our expert-led courses and upgrade your career. Join thousands of learners on the path to success.</p>
          <Link to="/courses" className="hero-btn">Browse Courses</Link>
        </div>
        <div className="hero-image">
          <img src={LearningImage} alt="Learning Illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
