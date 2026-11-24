
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  FiGrid,
  FiCreditCard,
  FiBarChart2,
  FiPieChart,
  FiSettings
} from 'react-icons/fi';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FiGrid /> },
    { name: 'Transactions', path: '/transactions', icon: <FiCreditCard /> },
    { name: 'Analytics', path: '/analytics', icon: <FiBarChart2 /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-label">MENU</div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-icon">✦</div>
          <h4>Manage your money</h4>
          <p>Make smarter financial decisions every day.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
