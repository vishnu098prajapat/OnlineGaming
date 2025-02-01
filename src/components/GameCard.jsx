import React from 'react';

const GameCard = ({ game, onClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="game-card skeleton">
        <div className="skeleton-img"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-button"></div>
      </div>
    );
  }

  return (
    <div className="game-card" onClick={() => onClick(game)}>
      <div className="game-card-content">
        <div className="game-image">
          <img src={game.image} alt={game.title} />
        </div>
        <div className="game-info">
          <h3>{game.title}</h3>
          <div className="game-rating">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <div className="review-count">(45)</div>
          </div>
          <button className="play-btn">Play Now</button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
