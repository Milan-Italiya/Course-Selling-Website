import React from 'react';
import Learnova from '../assets/learnova logo.png'; // Import your logo image
import '../css/Footer.css'; // Import your CSS file for styling
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <div className="footer-logo">
            <img src={Learnova} alt="Logo" onClick={()=>{navigate('/')}}/> {/* Replace with your logo */}
          </div>
          <p className="footer-description">
            Learnova is a leading platform for online courses. We help individuals gain knowledge and skills in a wide variety of subjects.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Info</h3>
          <ul>
            <li>Email: milanitaliya@learnova.com</li>
            <li>Phone: +1 (800) 123-4567</li>
            <li>Address: 1234 Course St, Knowledge City</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Stay Connected</h3>
          <p>Subscribe to our newsletter to stay updated on new courses and offers:</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Learnova. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
