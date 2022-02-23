import './App.css';

import NavBar from './components/NavBar';
import Grid from './components/Grid';
import InputMenu from './components/InputMenu';
import OverMessage from './components/OverMessage';

import { useState } from 'react';

const wordListUrl = "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words"

const blairWords = [
  "blair",
  "lunch",
  "shron",
  "drugs",
  "urbad",
  "lbozo",
  "ratio",
  "lodal",
  "smoke",
  "ligma",
  "urmom",
  "skill",
  "ricky",
  "uremo",
  "hadar",
  "blake",
  "moose",
  "dapme",
  "upbro",
  "ongod",
  "twash",
  "moyai",
  "tiffy",
  "kripa",
]

var db = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  
  const [lettersLL, setLettersLL] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ])

  const [rowNum, setRowNum] = useState(0);

  const [curWord, setCurWord] = useState("");

  const [answerWord] = useState(blairWords[Math.floor(Math.random()*blairWords.length)]);

  const updateWord = (e) => {

    if(db) return;

    let newWord = e.target.value.slice(0, 5);

    setCurWord(newWord);

    let newWordArray = newWord.split('').map((letter) => {return letter.toUpperCase()});
    while(newWordArray.length < 5) {
        newWordArray.push('');
    }

    const updatedLettersLL = lettersLL;
    updatedLettersLL[rowNum] = newWordArray;

    setLettersLL([...updatedLettersLL]);

    newWordArray = newWordArray.map((letter) => {return letter.toLowerCase()});

  }

  const submitWord = async (e) => {

    var inputField = document.getElementById('inputField');

    if(db) return;

    db = true;

    inputField.disabled = true;

    let response = await fetch(wordListUrl);
    
    var wordList = await response.text();
    
    wordList = wordList.split('\n');

    var letterLines = document.getElementsByClassName("grid")[0].children;

    let targetLine = letterLines[rowNum];

    if(!wordList.includes(curWord) && !blairWords.includes(curWord)) {

      for(let letterSquare of targetLine.children) {
        letterSquare.classList.add("textRedClass");
      }

      await sleep(1000);

      for(let letterSquare of targetLine.children) {
        letterSquare.classList.remove("textRedClass");
      }

      inputField.disabled = false;
      db = false;

      return;

    }

    inputField.value = "";

    var colorGrid = [0, 0, 0, 0, 0]

    var rightFrequency = {}

    for(let chara of answerWord) {
      if(chara in rightFrequency) {
        rightFrequency[chara]++;
      } else {
        rightFrequency[chara] = 1;
      }
    }

    var soFrequency = {}

    for(var i = 0; i<5; i++) {
      if(curWord.charAt(i) === answerWord.charAt(i)) {
        colorGrid[i] = 2;
        if(curWord.charAt(i) in soFrequency) {
          soFrequency[curWord.charAt(i)]++;
        } else {
          soFrequency[curWord.charAt(i)] = 1;
        }
      }
    }

    for(i = 0; i<5; i++) {
      if(colorGrid[i] === 2) continue;

      if(answerWord.includes(curWord.charAt(i))) {
        if(!(curWord.charAt(i) in soFrequency)) {
          colorGrid[i] = 1;
          soFrequency[curWord.charAt(i)] = 1;
          continue;
        }
        if(soFrequency[curWord.charAt(i)] < rightFrequency[curWord.charAt(i)]) {
          colorGrid[i] = 1;
          soFrequency[curWord.charAt(i)]++;
        }
      }
    }

    for(i = 0; i<5; i++) {
      if(colorGrid[i] === 0) {
        targetLine.children[i].classList.add("flashGreyClass");
      } else if(colorGrid[i] === 1) {
        targetLine.children[i].classList.add("flashYellowClass");
      } else {
        targetLine.children[i].classList.add("flashRedClass");
      }
      await(sleep(250));
    }

    setRowNum(rowNum + 1);

    if(rowNum === 5 || curWord === answerWord) {
      document.getElementById("overCon").classList.add('slideTopClass');
      return;
    }

    setCurWord("");

    db = false;
    inputField.disabled = false;

  }
  

  return (
    <div className="App">
      <NavBar />
      <div className="gridContainer">
        <Grid lettersLL={lettersLL}/>
      </div>
      <div className="inputContainer">
        <InputMenu updateWord={updateWord} submitWord={submitWord}/>
      </div>
      <div className="overCenter">
      <div className="overContainer" id="overCon">
        <OverMessage curWord={curWord} answerWord={answerWord}/>
      </div>
      </div>
    </div>
  );
}

export default App;
