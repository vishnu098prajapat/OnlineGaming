import React from 'react';
import { FaSearch } from 'react-icons/fa';

const categories = [
  { name: 'All Games', icon: '🎮' },
  { name: 'Action', icon: '⚔️' },
  { name: 'Puzzle', icon: '🧩' },
  { name: 'Racing', icon: '🏎️' },
  { name: 'Sports', icon: '⚽' }
];

const GameSearch = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="game-search">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>
      
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSearch;
