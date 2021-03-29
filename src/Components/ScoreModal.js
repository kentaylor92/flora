import React from 'react';
import {
  DISCOUNT_CODES
} from "./Constants";

const ScoreModal = ({score, gameOver}) => {
  console.log(score);
  return (
    <div className="score">
      <p>Your score is: {score}</p>
      {!!gameOver && <p>
        {/* {
        score >= 5 && score < 10 ? DISCOUNT_CODES.Five : 
        score >= 10 && score < 15 ? DISCOUNT_CODES.Ten : 
        score >= 15 && score < 20 ? DISCOUNT_CODES.Fifteen : 
        score >= 20 && score < 25 ? DISCOUNT_CODES.Twenty : 
        score >= 25 ? DISCOUNT_CODES.TwentyFive : 
        `Sorry, your score wasn't high enough. Play again to earn a discount!`} */}
      </p>}
      </div>

  )
}

export default ScoreModal;