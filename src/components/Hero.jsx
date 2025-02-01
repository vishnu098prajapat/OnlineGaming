import React from 'react';
import { FaGamepad, FaDice, FaTrophy, FaPlaystation } from 'react-icons/fa';

const Hero = () => {
  const scrollToGames = () => {
    const gamesSection = document.querySelector('.games-grid');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero">
      <div className="floating-icons">
        <FaGamepad className="floating-icon icon-1" />
        <FaDice className="floating-icon icon-2" />
        <FaTrophy className="floating-icon icon-3" />
        <FaPlaystation className="floating-icon icon-4" />
      </div>
      
      <div className="hero-content">
        <h1>Welcome to GameZone</h1>
        <p>Your Ultimate Gaming Destination</p>
        <div className="hero-buttons">
          <button onClick={scrollToGames} className="btn-primary">Play Games</button>
          <button className="btn-secondary">Popular Games</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
