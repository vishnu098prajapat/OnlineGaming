import React, { useEffect, useRef, useState } from 'react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: 'right',
    speed: 100,
    score: 0,
    gameOver: false
  });

  const resetGame = () => {
    setGameState({
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: 'right',
      speed: 100,
      score: 0,
      gameOver: false
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let gameLoop = null;

    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowUp': if(gameState.direction !== 'down') setGameState(prev => ({...prev, direction: 'up'})); break;
        case 'ArrowDown': if(gameState.direction !== 'up') setGameState(prev => ({...prev, direction: 'down'})); break;
        case 'ArrowLeft': if(gameState.direction !== 'right') setGameState(prev => ({...prev, direction: 'left'})); break;
        case 'ArrowRight': if(gameState.direction !== 'left') setGameState(prev => ({...prev, direction: 'right'})); break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    const runGame = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Move snake
      let newHead = {x: gameState.snake[0].x, y: gameState.snake[0].y};
      switch(gameState.direction) {
        case 'up': newHead.y--; break;
        case 'down': newHead.y++; break;
        case 'left': newHead.x--; break;
        case 'right': newHead.x++; break;
      }
      
      const newSnake = [...gameState.snake];
      newSnake.unshift(newHead);
      
      // Check if snake ate food
      if(newHead.x === gameState.food.x && newHead.y === gameState.food.y) {
        setGameState(prev => ({
          ...prev,
          snake: newSnake,
          food: {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
          },
          score: prev.score + 10
        }));
      } else {
        setGameState(prev => ({...prev, snake: newSnake.slice(0, -1)}));
      }
      
      // Draw snake
      ctx.fillStyle = 'lime';
      gameState.snake.forEach(segment => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
      });
      
      // Draw food
      ctx.fillStyle = 'red';
      ctx.fillRect(gameState.food.x * 20, gameState.food.y * 20, 18, 18);
      
      // Check collision
      if(newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20 ||
         gameState.snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameState(prev => ({...prev, gameOver: true}));
        clearInterval(gameLoop);
        return;
      }
    };

    gameLoop = setInterval(runGame, gameState.speed);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameLoop);
    };
  }, [gameState]);

  return (
    <div className="snake-game">
      <canvas ref={canvasRef} width={400} height={400} />
      {gameState.gameOver && (
        <div className="game-over-overlay">
          <h2>Game Over!</h2>
          <p>Score: {gameState.score}</p>
          <button className="restart-btn" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
