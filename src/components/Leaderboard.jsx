import React from 'react';
import { FaCrown } from 'react-icons/fa';

const Leaderboard = () => {
  const topPlayers = [
    { id: 1, name: 'Player 1', score: 2500, rank: 1 },
    { id: 2, name: 'Player 2', score: 2200, rank: 2 },
    { id: 3, name: 'Player 3', score: 2100, rank: 3 },
    { id: 4, name: 'Player 4', score: 2000, rank: 4 },
    { id: 5, name: 'Player 5', score: 1900, rank: 5 },
  ];

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">
        <FaCrown className="crown-icon" />
        Top Players
      </h2>
      
      <div className="leaderboard-list">
        {topPlayers.map((player) => (
          <div key={player.id} className="leaderboard-item">
            <div className="rank">#{player.rank}</div>
            <div className="player-info">
              <span className="player-name">{player.name}</span>
              <span className="player-score">{player.score} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 