import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "./useInterval";
// import { faHome } from "@fortawesome/fontawesome-svg-core";
// import { arrowRight, arrowLeft } from "@fortawesome/fontawesome-svg-core";
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
  const [hideButton, setHideButton] = useState(false);

  // console.log(score)

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
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

  let canvas = document.getElementById('#canvas');
  

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "#1A8943";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "pink";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <div className={`canvas`} role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
      {/* <button className={`start-button ${hideButton ? 'hidden' : ''}`} onClick={e => {e.preventDefault(); startGame(); setHideButton(true); }}>Start Game</button> */}
      <canvas
        style={{ border: "3px solid #5760AB" }}
        ref={canvasRef}
        id="canvas"
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
        onClick={e => {e.preventDefault(); startGame(); }}
      />

      <div className="mobile-controls">
        <div className="controls"><i className="fas fa-arrow-alt-circle-up" onClick={e => {goUp(); }}></i></div>
        <div className="left-right controls">
          <p className=""><i className="fas fa-arrow-alt-circle-left" onClick={e => {goLeft(); }}></i></p>
          <p className="" ><i className="fas fa-arrow-alt-circle-right" onClick={e => {goRight(); }}></i></p>
        </div>
        <p className="controls" ><i className="fas fa-arrow-alt-circle-down" onClick={e => {goDown(); }}></i></p>
      </div>

      {/* {score && <div>{score}</div>} */}
      {gameOver && 
        <div className="game-over">
          <img className="logo" src="/assets/logo-blue.png" alt="Tambayan by Paraluman Flora logo"></img>
          <h2>Game Over!</h2>
          <p className="thanks">Thank you for playing!</p>

        {!!score && <ScoreModal score={score} gameOver={gameOver} />}
          <button onClick={e => {e.preventDefault(); setGameOver(!gameOver); setHideButton(false); }}>Play Again!</button>

        </div>
      }
      {/* {!!score && <ScoreModal score={score} gameOver={gameOver}/>} */}
    </div>
  );
};

export default Canvas;