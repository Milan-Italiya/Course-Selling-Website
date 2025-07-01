import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import Learnova from '../assets/learnova logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const Token = sessionStorage.getItem('token')

  // Function to handle NavLink clicks and close menu
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsOpen(false);
  }


  const handleLogoutClick = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate('/login', { state: { logoutMessage: 'Logout Successfull' } })
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Learnova} alt="Learnova Logo" onClick={handleHomeClick} />
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        &#9776;
      </div>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li>
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? 'active' : '')}>
            Course
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/purchases"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? 'active' : '')}>
            Purchases
          </NavLink>
        </li>
        {Token && <li>
          <button
            onClick={() => {
              handleLinkClick();
              handleLogoutClick();
            }}
            className="logout-link"
          >
            Logout
          </button>

        </li>}

      </ul>
    </nav>
  );
};

export default Navbar;
