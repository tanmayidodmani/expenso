import React from "react";
import { FiSearch, FiBell, FiSun, FiMoon } from 'react-icons/fi';
const Header = ( { theme, toggleTheme, profile } ) => {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="brand-icon">E</div>
        <div className="brand-text">
          <h2>Expenso</h2>
          <span>Personal Finance</span>
        </div>
      </div>

      <div className="header-right">
        <div className="search-box">
          <FiSearch />
          <input type="text" placeholder="Search anything..." />
        </div>

        <button className="icon-btn" onClick={ toggleTheme }>
          { theme === 'light' ? <FiMoon /> : <FiSun /> }
        </button>

        <button className="icon-btn notification-btn">
          <FiBell />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="avatar">
            { profile?.name?.trim().charAt( 0 ).toUpperCase() || 'U' }
          </div>          <div className="profile-info">
            <strong>{ profile?.name || 'User' }</strong>
            <span>Personal Account</span>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header