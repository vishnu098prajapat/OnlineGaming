import React, { useEffect, useRef } from 'react';

const FlappyBird = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let birdY = canvas.height / 2;
    let velocity = 0;
    const gravity = 0.3; 
    const jumpStrength = -8; 
    const pipeWidth = 50;
    let pipes = [];
    let score = 0;
    let gameOver = false;
    let timer = 0; // Initialize timer
    let countdown = 3; // Countdown timer for game start

    class Pipe {
      constructor() {
        this.x = canvas.width;
        this.gap = 200; 
        this.topHeight = Math.random() * (canvas.height - this.gap - 100) + 50;
        this.bottomY = this.topHeight + this.gap;
        this.passed = false; // Add a flag to track if the pipe has been passed
      }

      move() {
        this.x -= 1.5; 
      }

      draw() {
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(this.x, 0, pipeWidth, this.topHeight);
        ctx.fillRect(this.x, this.bottomY, pipeWidth, canvas.height - this.bottomY);
      }
    }

    function startGame() {
      const countdownInterval = setInterval(() => {
        if (countdown > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#000';
          ctx.font = '48px Arial';
          ctx.fillText('Game starts in: ' + countdown, canvas.width / 2 - 100, canvas.height / 2);
          countdown--;
        } else {
          clearInterval(countdownInterval);
          gameLoop();
        }
      }, 1000);
    }

    function gameLoop() {
      if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        velocity += gravity;
        birdY += velocity;

        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.ellipse(100, birdY, 20, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
          pipes.push(new Pipe());
        }

        pipes = pipes.filter(pipe => pipe.x > -pipeWidth);
        
        pipes.forEach(pipe => {
          pipe.move();
          pipe.draw();

          if (100 + 20 > pipe.x && 100 - 20 < pipe.x + pipeWidth) {
            if (birdY - 20 < pipe.topHeight || birdY + 20 > pipe.bottomY) {
              gameOver = true;
            }
          }

          // Increment score when passing through pipes
          if (pipe.x + pipeWidth < 100 && !pipe.passed) {
            score++;
            pipe.passed = true; // Mark this pipe as passed
          }
        });

        ctx.fillStyle = '#000';
        ctx.font = '24px Arial';
        ctx.fillText('Score: ' + score, 10, 30);

        // Update and display timer
        timer += 1 / 60; // Assuming game runs at 60 FPS
        ctx.fillText('Time: ' + Math.floor(timer) + 's', 10, 60);

        if (birdY > canvas.height || birdY < 0) {
          gameOver = true;
        }
      } else {
        ctx.fillStyle = '#000';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2 - 40);
        ctx.font = '24px Arial';
        ctx.fillText('Final Score: ' + score, canvas.width / 2 - 60, canvas.height / 2);
        ctx.fillText('Time: ' + Math.floor(timer) + 's', canvas.width / 2 - 60, canvas.height / 2 + 40);
        ctx.fillText('Click to Restart', canvas.width / 2 - 80, canvas.height / 2 + 80);
      }

      requestAnimationFrame(gameLoop);
    }

    function handleClick() {
      if (gameOver) {
        resetGame();
      } else {
        velocity = jumpStrength;
      }
    }

    function resetGame() {
      birdY = canvas.height / 2;
      velocity = 0;
      pipes = [];
      score = 0;
      timer = 0;
      countdown = 3; // Reset countdown
      gameOver = true;
      setTimeout(() => {
        gameOver = false;
      }, 3000); // 3 seconds delay before restarting
    }

    canvas.addEventListener('click', handleClick);
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') handleClick();
    });

    startGame();

    return () => {
      canvas.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', (e) => {
        if (e.code === 'Space') handleClick();
      });
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: '#1a1a1a', padding: '20px' }}>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600}
        style={{ 
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          background: '#87CEEB'
        }}
      />
    </div>
  );
};

export default FlappyBird;
