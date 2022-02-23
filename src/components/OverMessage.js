import React from 'react'

import './OverMessage.css'

const OverMessage = ( {curWord, answerWord, rowNum} ) => {
  return (
    <div className="overContent">
        <h1>Congrats...</h1>
        <h2 style={{color: (curWord === answerWord ? "black" : "rgb(217,43,54)")}}>{curWord === answerWord ? "For Not Throwing!" : "For Sucking So Much!"}</h2>
        <p>{curWord === answerWord ? `You got it in ${rowNum} tries.` : `The right word was ${answerWord} you bozo.`}</p>
        <p>Refresh for a New Game</p>
    </div>
  )
}

export default OverMessage