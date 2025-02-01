import React, { useState } from 'react';

const GameModal = ({ isOpen, onClose, children, title, onRestart }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className={`modal-content ${isFullscreen ? 'fullscreen' : ''}`}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <div className="modal-controls">
            <button 
              className="control-btn restart"
              onClick={onRestart}
              title="Restart Game"
            >
              ↺
            </button>
            <button 
              className={`control-btn ${isFullscreen ? 'minimize' : 'maximize'}`}
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Minimize Screen' : 'Maximize Screen'}
            >
              {isFullscreen ? '⤓' : '⤢'}
            </button>
            <button 
              className="control-btn close"
              onClick={onClose}
              title="Close Game"
            >
              ×
            </button>
          </div>
        </div>
        <div id="game-container" className={isFullscreen ? 'fullscreen' : ''}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameModal;
