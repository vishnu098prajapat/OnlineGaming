import React, { useState, useEffect, useRef } from 'react';

const BLOCK_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
];

const COLORS = [
  '#00f0f0', // I - Cyan
  '#f0f000', // O - Yellow
  '#a000f0', // T - Purple
  '#f0a000', // L - Orange
  '#0000f0', // J - Blue
  '#00f000', // S - Green
  '#f00000', // Z - Red
];

const TetrisGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameState, setGameState] = useState({
    board: Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)),
    currentPiece: null,
    currentPieceColor: null,
    currentX: 0,
    currentY: 0
  });
  const [isPaused, setIsPaused] = useState(false);

  const resetGame = () => {
    setGameState({
      board: Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)),
      currentPiece: null,
      currentPieceColor: null,
      currentX: 0,
      currentY: 0
    });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const createNewPiece = () => {
    const pieceIndex = Math.floor(Math.random() * SHAPES.length);
    return {
      shape: SHAPES[pieceIndex],
      color: COLORS[pieceIndex],
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(SHAPES[pieceIndex][0].length / 2),
      y: 0
    };
  };

  const drawBoard = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw board
    gameState.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.fillStyle = COLORS[value - 1];
          ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
        }
      });
    });

    // Draw current piece
    if (gameState.currentPiece) {
      ctx.fillStyle = gameState.currentPieceColor;
      gameState.currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            ctx.fillRect(
              (gameState.currentX + x) * BLOCK_SIZE,
              (gameState.currentY + y) * BLOCK_SIZE,
              BLOCK_SIZE - 1,
              BLOCK_SIZE - 1
            );
          }
        });
      });
    }

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * BLOCK_SIZE, 0);
      ctx.lineTo(x * BLOCK_SIZE, ctx.canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * BLOCK_SIZE);
      ctx.lineTo(ctx.canvas.width, y * BLOCK_SIZE);
      ctx.stroke();
    }
  };

  const isValidMove = (piece, x, y) => {
    return piece.every((row, dy) => {
      return row.every((value, dx) => {
        let newX = x + dx;
        let newY = y + dy;
        return (
          value === 0 ||
          (newX >= 0 &&
            newX < BOARD_WIDTH &&
            newY < BOARD_HEIGHT &&
            (newY < 0 || gameState.board[newY][newX] === 0))
        );
      });
    });
  };

  const mergePiece = () => {
    const newBoard = gameState.board.map(row => [...row]);
    gameState.currentPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const newY = gameState.currentY + y;
          if (newY >= 0) {
            newBoard[newY][gameState.currentX + x] = SHAPES.findIndex(shape => 
              shape.length === gameState.currentPiece.length &&
              shape[0].length === gameState.currentPiece[0].length &&
              shape.every((row, i) => row.every((cell, j) => cell === gameState.currentPiece[i][j]))
            ) + 1;
          }
        }
      });
    });
    return newBoard;
  };

  const checkLines = () => {
    let lines = 0;
    const newBoard = gameState.board.filter(row => {
      if (row.every(cell => cell !== 0)) {
        lines++;
        return false;
      }
      return true;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    
    if (lines > 0) {
      setScore(prev => prev + (lines * 100));
      return newBoard;
    }
    return gameState.board;
  };

  const moveDown = () => {
    if (gameOver || isPaused) return;

    if (isValidMove(gameState.currentPiece, gameState.currentX, gameState.currentY + 1)) {
      setGameState(prev => ({
        ...prev,
        currentY: prev.currentY + 1
      }));
    } else {
      // Merge piece and create new one
      const newBoard = mergePiece();
      const clearedBoard = checkLines();
      
      const newPiece = createNewPiece();
      if (!isValidMove(newPiece.shape, newPiece.x, newPiece.y)) {
        setGameOver(true);
        return;
      }

      setGameState(prev => ({
        board: clearedBoard,
        currentPiece: newPiece.shape,
        currentPieceColor: newPiece.color,
        currentX: newPiece.x,
        currentY: newPiece.y
      }));
    }
  };

  const movePiece = (dx) => {
    if (gameOver || isPaused) return;
    if (isValidMove(gameState.currentPiece, gameState.currentX + dx, gameState.currentY)) {
      setGameState(prev => ({
        ...prev,
        currentX: prev.currentX + dx
      }));
    }
  };

  const rotatePiece = () => {
    if (gameOver || isPaused) return;
    const rotated = gameState.currentPiece[0].map((_, i) =>
      gameState.currentPiece.map(row => row[row.length - 1 - i])
    );
    if (isValidMove(rotated, gameState.currentX, gameState.currentY)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: rotated
      }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || isPaused) return;

      // Prevent default behavior for game controls
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch(e.key) {
        case 'ArrowLeft':
          if (isValidMove(gameState.currentPiece, gameState.currentX - 1, gameState.currentY)) {
            setGameState(prev => ({ ...prev, currentX: prev.currentX - 1 }));
          }
          break;
        case 'ArrowRight':
          if (isValidMove(gameState.currentPiece, gameState.currentX + 1, gameState.currentY)) {
            setGameState(prev => ({ ...prev, currentX: prev.currentX + 1 }));
          }
          break;
        case 'ArrowDown':
          if (isValidMove(gameState.currentPiece, gameState.currentX, gameState.currentY + 1)) {
            setGameState(prev => ({ ...prev, currentY: prev.currentY + 1 }));
          }
          break;
        case 'ArrowUp':
          const rotated = gameState.currentPiece[0].map((_, i) =>
            gameState.currentPiece.map(row => row[row.length - 1 - i])
          );
          if (isValidMove(rotated, gameState.currentX, gameState.currentY)) {
            setGameState(prev => ({ ...prev, currentPiece: rotated }));
          }
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, gameOver, isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!gameState.currentPiece) {
      const newPiece = createNewPiece();
      setGameState(prev => ({
        ...prev,
        currentPiece: newPiece.shape,
        currentPieceColor: newPiece.color,
        currentX: newPiece.x,
        currentY: newPiece.y
      }));
    }

    drawBoard(ctx);

    const gameLoop = setInterval(() => {
      if (!isPaused) {
        moveDown();
      }
    }, 1000);

    return () => clearInterval(gameLoop);
  }, [gameState, isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawBoard(ctx);
  }, [gameState]);

  return (
    <div className="tetris-game" onClick={e => e.stopPropagation()}>
      <canvas
        ref={canvasRef}
        width={BLOCK_SIZE * BOARD_WIDTH}
        height={BLOCK_SIZE * BOARD_HEIGHT}
      />
      
      {(gameOver || isPaused) && (
        <div className="game-over-overlay">
          <h2>{gameOver ? 'Game Over!' : 'Paused'}</h2>
          <p>Score: {score}</p>
          <button className="restart-btn" onClick={resetGame}>
            {gameOver ? 'Play Again' : 'Restart'}
          </button>
          {!gameOver && (
            <button className="resume-btn" onClick={() => setIsPaused(false)}>
              Resume
            </button>
          )}
        </div>
      )}

      <div className="game-controls">
        <p>← → : Move</p>
        <p>↑ : Rotate</p>
        <p>↓ : Drop</p>
        <p>Space : Pause</p>
      </div>
    </div>
  );
};

export default TetrisGame;
