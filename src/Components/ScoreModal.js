import React from 'react';

const ScoreModal = ({score, gameOver}) => {
  return (
    <div className="score">
      <p>Your score is: {score}</p>
      {!!gameOver && 
        score < 20 ? 
        <p className="loser">
          Try again! Reach the mystery high score to receive 20% off!
        </p>
        : 
        <p className="winner">You win!  Your discount code is "KIM ROCKS"</p>
      }
      </div>

  )
}

export default ScoreModal;