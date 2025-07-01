import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="simple-sidebar">
      <h3>Navigation</h3>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
