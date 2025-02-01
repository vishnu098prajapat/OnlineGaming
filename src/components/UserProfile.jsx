import React from 'react';
import { FaTrophy, FaGamepad, FaMedal } from 'react-icons/fa';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="/default-avatar.png" alt="User Avatar" />
        </div>
        <div className="profile-info">
          <h2>Player 1</h2>
          <p className="level">Level 5</p>
        </div>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <FaGamepad className="stat-icon" />
          <div className="stat-info">
            <h3>Games Played</h3>
            <span className="stat-value">24</span>
          </div>
        </div>
        
        <div className="stat-card">
          <FaTrophy className="stat-icon" />
          <div className="stat-info">
            <h3>Achievements</h3>
            <span className="stat-value">8</span>
          </div>
        </div>
        
        <div className="stat-card">
          <FaMedal className="stat-icon" />
          <div className="stat-info">
            <h3>High Scores</h3>
            <span className="stat-value">12</span>
          </div>
        </div>
      </div>
      
      <div className="achievements-section">
        <h3>Recent Achievements</h3>
        <div className="achievements-grid">
          {/* Achievement badges */}
          <div className="achievement-badge">🏆</div>
          <div className="achievement-badge">🎮</div>
          <div className="achievement-badge">⭐</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 