import React from 'react'

import './InputMenu.css'

const InputMenu = ({ updateWord, submitWord }) => {

    return (
        <div className="inputMenu">
            <div className="inputForm">
                <input type="text" id="inputField" onChange={(e) => updateWord(e)} onKeyPress={(e) => {if(e.key === "Enter") submitWord(e)}}></input>
                <input type="submit" className="button-45" onClick={(e) => submitWord(e)}></input>
            </div>
        </div>
    )
}

export default InputMenu