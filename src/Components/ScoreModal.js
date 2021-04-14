import React from 'react';

const ScoreModal = ({score, gameOver}) => {
  return (
    <div className="score">
      <p>Your score is: {score}</p>
      {!!gameOver && 
        score < 15 ? 
        <p className="loser">
          Try again! Reach the mystery high score to receive 20% off!
        </p>
        : 
        <p className="winner">You win! Take a screenshot to claim your prize at the event!</p>
      }
      </div>

  )
}

export default ScoreModal;