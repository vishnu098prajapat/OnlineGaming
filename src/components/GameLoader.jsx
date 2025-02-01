import React, { useEffect } from 'react';
import './GameLoader.css';

const GameLoader = ({ gameUrl }) => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cdn.htmlgames.com/embed.js';
    
    // Extract game name from URL
    const gameName = gameUrl.split('/')[4];
    
    // Set the game attribute
    script.setAttribute('game', gameName);
    script.setAttribute('bgcolor', 'white');
    
    // Add to container
    const container = document.getElementById('game-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [gameUrl]);

  return (
    <div id="game-container" className="game-container"></div>
  );
};

export default GameLoader;
