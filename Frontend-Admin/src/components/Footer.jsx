import React from 'react';
import AdminLogo from '../assets/AdminLogo.png';
import '../css/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="footer admin-footer">
      <div className="footer-content">
        <div className="footer-column">
          <div className="footer-logo">
            <img src={AdminLogo} alt="Admin Logo" />
          </div>
          <p className="footer-description">
            This admin panel helps manage courses, users, reports, and site content for the CourseHub platform efficiently and securely.
          </p>
        </div>

        <div className="footer-column">
          <h3>Admin Links</h3>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/admin/users">Manage Users</a></li>
            <li><a href="/admin/courses">Manage Courses</a></li>
            <li><a href="/admin/reports">Reports</a></li>
            <li><a href="/admin/settings">Settings</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li>Email: admin@learnova.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Admin Office, Edu Street, India</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>System Info</h3>
          <p>Version: 2.5.1</p>
          <p>Last Updated: May 2025</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-slack"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-discord"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 learnova Admin Panel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
