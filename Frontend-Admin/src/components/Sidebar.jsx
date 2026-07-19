import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = ({collapsed,setCollapsed}) => {
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogoutClick = () => {
    sessionStorage.clear();

    navigate('/admin/login', {
      state: { logoutMessage: 'Logout Successfull' },
    });
  };

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      
      {/* HEADER */}

      <div className="sidebar-header">
        {!collapsed && <h2>Course Admin</h2>}

        <button className="hamburger-btn" onClick={toggleSidebar}>
          <span className={`menu-icon ${collapsed ? 'open' : ''}`}>
            {collapsed ? (
              <i className="fa-solid fa-bars"></i>
            ) : (
              <i className="fa-solid fa-xmark"></i>
            )}
          </span>
        </button>
      </div>

      {/* MENU */}

      {!collapsed && (
        <ul>
          <li
            className={isActive('/') ? 'active' : ''}
            onClick={() => navigate('/')}
          >
            Dashboard
          </li>

          <li
            className={isActive('/admin/our-courses') ? 'active' : ''}
            onClick={() => navigate('/admin/our-courses')}
          >
            Courses
          </li>

          <li
            className={isActive('/admin/orders') ? 'active' : ''}
            onClick={() => navigate('/admin/orders')}
          >
            Orders
          </li>

          <li
            className={isActive('/admin/users') ? 'active' : ''}
            onClick={() => navigate('/admin/users')}
          >
            Users
          </li>

          <li
            className={isActive('/admin/manage-curriculum') ? 'active' : ''}
            onClick={() => navigate('/admin/manage-curriculum')}
          >
            Curriculums
          </li>

          <li className="logout" onClick={handleLogoutClick}>
            Logout
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;