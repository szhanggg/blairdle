import React from 'react'

import Square from './Square';

import './Line.css'

const Line = ( {letterList} ) => {
  return (
    <div className="line">
        <Square letter={letterList[0]}/>
        <Square letter={letterList[1]}/>
        <Square letter={letterList[2]}/>
        <Square letter={letterList[3]}/>
        <Square letter={letterList[4]}/>
    </div>
  )
}

export default Line