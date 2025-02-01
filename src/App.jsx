import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import GameSearch from './components/GameSearch';
import GameCard from './components/GameCard';
import UserProfile from './components/UserProfile';
import Leaderboard from './components/Leaderboard';
import { FaArrowLeft, FaExpand, FaRedo, FaTimes } from 'react-icons/fa';

function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Games');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const games = [
    {
      id: '1010classic',
      title: '1010 Classic',
      url: 'https://cdn.htmlgames.com/1010Classic/',
      category: 'Puzzle',
      image: '/game-images/1010classic200.webp'
    },
    {
      id: 'ninjabreakout',
      title: 'Ninja Breakout',
      url: 'https://cdn.htmlgames.com/NinjaBreakout/',
      category: 'Action',
      image: '/game-images/ninjadarts-200.webp'
    },
    {
      id: 'deliciousduos',
      title: 'Delicious Duos',
      url: 'https://cdn.htmlgames.com/DeliciousDuos/',
      category: 'Puzzle',
      image: '/game-images/deliciousduos200.webp'
    },
    {
      id: 'monkeyconnect',
      title: 'Monkey Connect',
      url: 'https://cdn.htmlgames.com/MonkeyConnect/',
      category: 'Puzzle',
      image: '/game-images/monkeyconnect200.webp'
    },
    {
      id: 'winterbubble',
      title: 'Winter Bubble',
      url: 'https://cdn.htmlgames.com/WinterBubble/',
      category: 'Puzzle',
      image: '/game-images/winterbubble200.webp'
    },
    {
      id: 'downhill',
      title: 'Downhill',
      url: 'https://cdn.htmlgames.com/Downhill/',
      category: 'Sports',
      image: '/game-images/downhill200.webp'
    },
    {
      id: 'piratemysteries',
      title: 'Pirate Mysteries',
      url: 'https://cdn.htmlgames.com/PirateMysteries/',
      category: 'Puzzle',
      image: '/game-images/piratemysteries200.webp'
    },
    {
      id: 'galaxyshooter',
      title: 'Galaxy Shooter',
      url: 'https://cdn.htmlgames.com/GalaxyShooter/',
      category: 'Action',
      image: '/game-images/galaxyshooter200.webp'
    },
    {
      id: 'frozenforchristmas',
      title: 'Frozen For Christmas',
      url: 'https://cdn.htmlgames.com/FrozenForChristmas/',
      category: 'Puzzle',
      image: '/game-images/frozenforchristmas200.webp'
    },
    {
      id: 'mayagolf2',
      title: 'Maya Golf 2',
      url: 'https://cdn.htmlgames.com/MayaGolf2/',
      category: 'Sports',
      image: '/game-images/mayagolf2200.webp'
    },
    {
      id: 'airportsniper',
      title: 'Airport Sniper',
      url: 'https://cdn.htmlgames.com/AirportSniper/',
      category: 'Action',
      image: '/game-images/airportsniper200.webp'
    },
    {
      id: 'trafficracer2',
      title: 'Traffic Racer 2',
      url: 'https://cdn.htmlgames.com/TrafficRacer2/',
      category: 'Racing',
      image: '/game-images/trafficracer2300200.webp'
    },
    {
      id: 'junglesniper',
      title: 'Jungle Sniper',
      url: 'https://cdn.htmlgames.com/JungleSniper/',
      category: 'Action',
      image: '/game-images/junglesniper200.webp'
    },
    {
      id: 'goldminer',
      title: 'Gold Miner',
      url: 'https://cdn.htmlgames.com/GoldMiner/',
      category: 'Puzzle',
      image: '/game-images/goldminer200.webp'
    },
    {
      id: 'alieninvaders2',
      title: 'Alien Invaders 2',
      url: 'https://cdn.htmlgames.com/AlienInvaders2/',
      category: 'Action',
      image: '/game-images/alieninvaders200.webp'
    },
    {
      id: 'rescuethedivers2',
      title: 'Rescue The Divers 2',
      url: 'https://cdn.htmlgames.com/RescueTheDivers2/',
      category: 'Action',
      image: '/game-images/rescuethedivers2200.webp'
    },
    {
      id: 'caribbeanslide',
      title: 'Caribbean Slide',
      url: 'https://cdn.htmlgames.com/CaribbeanSlide/',
      category: 'Puzzle',
      image: '/game-images/caribbeanslide200.webp'
    },
    {
      id: 'soldierattack2',
      title: 'Soldier Attack 2',
      url: 'https://cdn.htmlgames.com/SoldierAttack2/',
      category: 'Action',
      image: '/game-images/soldierattack2200.webp'
    },
    {
      id: 'junglejump',
      title: 'Jungle Jump',
      url: 'https://cdn.htmlgames.com/JungleJump/',
      category: 'Action',
      image: '/game-images/junglejump200.webp'
    },
    {
      id: 'archer',
      title: 'Archer',
      url: 'https://cdn.htmlgames.com/Archer/',
      category: 'Action',
      image: '/game-images/archer200.webp'
    },
    {
      id: 'tesladefense',
      title: 'Tesla Defense',
      url: 'https://cdn.htmlgames.com/TeslaDefense/',
      category: 'Strategy',
      image: '/game-images/tesladefense200.webp'
    },
    {
      id: 'swordhit',
      title: 'Sword Hit',
      url: 'https://cdn.htmlgames.com/SwordHit/',
      category: 'Action',
      image: '/game-images/swordhit200.webp'
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Games' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGameClick = (game) => {
    setCurrentGame(game);
  };

  const closeGame = () => {
    setCurrentGame(null);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <Navbar />
      {!currentGame ? (
        <>
          <Hero />
          <div className="app-layout">
            <div className="main-content">
              <GameSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <div className="games-grid">
                {isLoading ? (
                  [...Array(8)].map((_, index) => (
                    <GameCard key={index} isLoading={true} />
                  ))
                ) : (
                  filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onClick={handleGameClick}
                      isLoading={false}
                    />
                  ))
                )}
              </div>
            </div>
            
            <div className="sidebar">
              <div className="user-section">
                <UserProfile />
                <Leaderboard />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="game-container">
          <div className="game-controls">
            <div className="left-controls">
              <button className="control-btn back" onClick={closeGame} title="Back to Games">
                <FaArrowLeft /> Back to Games
              </button>
              <span className="game-title">{currentGame.title}</span>
            </div>
            
            <div className="right-controls">
              <button className="control-btn fullscreen" onClick={toggleFullscreen} title="Fullscreen">
                <FaExpand />
              </button>
              <button className="control-btn reload" onClick={reloadGame} title="Reload Game">
                <FaRedo />
              </button>
              <button className="control-btn close" onClick={closeGame} title="Close Game">
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="game-frame-container">
            <iframe
              ref={iframeRef}
              src={currentGame.url}
              className="game-iframe"
              title={currentGame.title}
              allowFullScreen
              frameBorder="0"
              scrolling="no"
              allow="autoplay; fullscreen"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
