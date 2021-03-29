import React from 'react';

const ScoreModal = ({score, gameOver}) => {
  console.log(score);
  return (
    <div className="score">
      <p>Your score is: {score}</p>
      {!!gameOver && <p>
      </p>}
      </div>

  )
}

export default ScoreModal;