import React, { useEffect, useRef } from 'react';

const HTML5Game = ({ gameId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement('script');
      script.src = `https://cdn.htmlgames.com/embed.js?game=${gameId}&bgcolor=white`;
      script.async = true;
      
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(script);

      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    }
  }, [gameId]);

  return (
    <div ref={containerRef} className="html5-game-container" />
  );
};

export default HTML5Game;
