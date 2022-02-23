import React from 'react'

import Line from './Line';

import './Grid.css'

const Grid = ( { lettersLL } ) => {



  return (
    <div className="grid">
        <Line letterList={lettersLL[0]}/>
        <Line letterList={lettersLL[1]}/>
        <Line letterList={lettersLL[2]}/>
        <Line letterList={lettersLL[3]}/>
        <Line letterList={lettersLL[4]}/>
        <Line letterList={lettersLL[5]}/>
    </div>
  )
}

export default Grid