import React from 'react'

import './Square.css'

const Square = ({letter}) => {
  return (
    <div className="square" style={{backgroundColor: 'black'}}>
        <h1>{letter}</h1>
    </div>
  )
}

export default Square