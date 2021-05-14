import React, { useState, useEffect } from 'react';
import { Images } from './components/Images';
import { catImages } from './components/ImgSrc';
import { Round } from './components/Round';
import { Score } from './components/Score';
import { Loading } from './components/Loading';
import './gameboard.css';

const App = () => {
  // states
  const [load, setLoad] = useState(false);
  const [score, setScore] = useState(0);
  const [click, setClick] = useState({});
  const [array1, setArray1] = useState([]);
  const [cardCount, setCardCount] = useState(5);
  const [highScore, setHighScore] = useState(0);

  function loadGame() {
    setLoad(false);
    setClick({});
    setArray1(() => {
      let index = Math.floor(Math.random() * catImages.length);
      if (index >= catImages.length - 5) index = catImages.length - 10;
      const newArr = catImages.slice(index, index + cardCount);
      setLoad(true);
      return newArr;
    });
  }
  function shuffleArray() {
    let [...shufArray] = array1;
    let i = 0;
    let l = array1.length;
    for (i; i < l; i++) {
      const j = Math.floor(Math.random() * l);
      const temp = shufArray[i];
      shufArray[i] = shufArray[j];
      shufArray[j] = temp;
    }
    return shufArray;
  }

  function shuffleCard(e) {
    let item = e.target.id;
    checkClick(item);
    const shuffleArr = shuffleArray();
    setArray1([...shuffleArr]);
  }

  function answerUI(classname) {
    const gameboard = document.getElementById('gameContainer');
    gameboard.classList.add(classname);
    setTimeout(() => {
      gameboard.classList.remove(classname);
    }, 300);
  }

  function checkClick(name) {
    // accepts the target ID
    setClick((prev) => ({
      ...prev,
      [name]: true,
    }));
    if (click[name] === true) {
      answerUI('incorrect');
      endGame();
    } else {
      setScore(score + 1);
      answerUI('correct');
    }
  }

  function endGame() {
    setHighScore((prev) => {
      if (prev > score) return prev;
      else return score;
    });
    setScore(0);
  }

  useEffect(() => {
    const expr = score;
    switch (expr) {
      case 0: {
        setCardCount(5);
        loadGame();
        break;
      }
      case 5: {
        setCardCount(8);
        loadGame();
        break;
      }
      case 13: {
        setCardCount(11);
        loadGame();
        break;
      }
      case 24: {
        setCardCount(14);
        loadGame();
        break;
      }
      default: {
        return;
      }
    }
  }, [score, cardCount]);

  return (
    <div>
      <h1>A Game of Memory</h1>

      <Round cards={cardCount} />

      <Score score={score} record={highScore} />

      {load === false ? (
        <Loading message='loading...' />
      ) : (
        <Loading message='' />
      )}
      <div id='gameContainer' className='gameboard'>
        {load === true && <Images images={array1} onClick={shuffleCard} />}
      </div>
    </div>
  );
};

export default App;
