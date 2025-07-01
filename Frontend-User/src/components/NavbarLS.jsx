import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import Learnova from '../assets/learnova logo.png';

const NavbarLS = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle NavLink clicks and close menu
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsOpen(false);
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
            to="/signup"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? 'active' : '')}>
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? 'active' : '')}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarLS;
