import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogoutClick = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('admin');
    navigate('/admin/login', { state: { logoutMessage: 'Logout Successfull' } });
  };

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Course Admin</h2>}
        <button className="hamburger-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      {!collapsed && (
        <ul>
          <li className={isActive('/') ? 'active' : ''} onClick={() => navigate('/')}>Dashboard</li>
          <li className={isActive('/admin/our-courses') ? 'active' : ''} onClick={() => navigate('/admin/our-courses')}>Manage Courses</li>
          <li className={isActive('/admin/students') ? 'active' : ''} onClick={() => navigate('/admin/students')}>Students</li>
          <li className={isActive('/admin/orders') ? 'active' : ''} onClick={() => navigate('/admin/orders')}>Orders</li>
          <li className={isActive('/admin/analytics') ? 'active' : ''} onClick={() => navigate('/admin/analytics')}>Analytics</li>
          <li className={isActive('/admin/settings') ? 'active' : ''} onClick={() => navigate('/admin/settings')}>Settings</li>
          <li className="logout" onClick={handleLogoutClick}>Logout</li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
