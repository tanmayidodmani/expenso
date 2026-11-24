import { useState } from 'react';
import './Settings.css';

const Settings = ({ profile, onUpdateProfile }) => {
  const [name, setName] = useState(profile?.name || 'User');
  const [email, setEmail] = useState(profile?.email || '');

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your profile and preferences</p>
      </div>

      <div className="settings-card">
        <h2>Profile Settings</h2>

        <div className="profile-avatar">
          {name.trim().charAt(0).toUpperCase() || 'U'}
        </div>

        <div className="settings-form">
          <div className="settings-field">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="settings-field">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <button
            className="save-profile-btn"
            onClick={() => onUpdateProfile({ name, email })}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;