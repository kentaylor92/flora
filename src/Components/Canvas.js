import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "./useInterval";
import { useSwipeable } from "react-swipeable";
import '../Styles/Canvas.scss';
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from "./Constants";
import ScoreModal from './ScoreModal';

const Canvas = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(null);
  const [gameOn, setGameOn] = useState(false);

  // console.log(score)

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    setGameOn(false);
  };

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

  const goLeft = () => {
    setDir(DIRECTIONS[37]);
  }
  const goRight = () => {
    setDir(DIRECTIONS[39]);
  }
  const goUp = () => {
    setDir(DIRECTIONS[38]);
  }
  const goDown = () => {
    setDir(DIRECTIONS[40]);
  }

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      setScore(score + 1)
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setScore(null)
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "#5760AB";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "#F29FC5";
    context.fillRect(apple[0], apple[1], 1, 1);

  }, [snake, apple, gameOver]);

  const handlers = useSwipeable({
    onSwipedLeft: () => goLeft(),
    onSwipedRight: () => goRight(),
    onSwipedUp: () => goUp(),
    onSwipedDown: () => goDown(),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
    delta: 0,
  });
  

  return (
    <div {...handlers} className={`canvas`} role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
      <button className={`start-button ${gameOn ? 'hidden' : ''}`} onClick={e => {e.preventDefault(); startGame(); setGameOn(true); }}>Start Game</button>
      {<canvas
        style={{ border: "3px solid #F4763A", display: gameOver ? 'none': 'block' }}
        ref={canvasRef}
        id="canvas"
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}        
      />}

      {!gameOver && score ? <div className="score-main">Your score: {score}</div> : <div className="score-main">Your score: 0</div>}
      {gameOver && 
        <div className="game-over">
          <img className="mobile-top-img" src="/assets/tambayan-mobile-top-flower-x2.png" alt="Tambayan by Paraluman Flora logo"></img>          
          <img className="logo" src="/assets/logo-orange.png" alt="Tambayan by Paraluman Flora logo"></img>          
          <div className="thanks">
            <h2>You're invited to our grand opening!</h2>
            <p>May 8th at 9am</p>            
            <p>McCormick Park</p>
            <p>Toronto, ON</p>
          </div>

        {gameOver && !!score && <ScoreModal score={score} gameOver={gameOver} />}

        <button className="play-again" onClick={e => {e.preventDefault(); setGameOver(!gameOver);}}>Play Again!</button>

        {!!gameOver && <img className="mobile-bottom-img-game-over" src="/assets/tambayan-mobile-bottom-flower-x2.png" alt="Tambayan by Paraluman Flora logo"></img>}
        </div>
      }      
      {!gameOver && <img className="mobile-bottom-img" src="/assets/tambayan-mobile-bottom-flower-x2.png" alt="Tambayan by Paraluman Flora logo"></img>}       
    </div>
  );
};

export default Canvas;