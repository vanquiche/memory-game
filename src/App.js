import React, { useState, useEffect } from 'react';
import { Images } from './components/Images';
import { catImages } from './components/ImgSrc';
import { Round } from './components/Round';
import { Score } from './components/Score';
import { Loading } from './components/Loading';
import './reset.css';
import './App.css';

const App = () => {
  // states
  const [load, setLoad] = useState(false);
  const [score, setScore] = useState(0);
  const [click, setClick] = useState({});
  const [array1, setArray1] = useState([]);
  const [cardCount, setCardCount] = useState(5);
  const [highScore, setHighScore] = useState(0);

  async function loadGame() {
    setLoad(false);
    setClick({});
    await setArray1(() => {
      let index = Math.floor(Math.random() * catImages.length);
      if (index >= catImages.length - cardCount)
        index = catImages.length - cardCount;
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

  function handleClick(e) {
    let item = e.target.id;
    checkClick(item);
    const shuffleArr = shuffleArray();
    setArray1([...shuffleArr]);
  }

  function answerUI(classname, element) {
    const el = document.getElementById(element);
    el.classList.add(classname);
    setTimeout(() => {
      el.classList.remove(classname);
    }, 400);
  }

  function checkClick(name) {
    // accepts the target ID
    setClick((prev) => ({
      ...prev,
      [name]: true,
    }));
    if (click[name] === true) {
      answerUI('incorrect', 'info');
      endGame();
    } else {
      setScore(score + 1);
      answerUI('correct', 'info');
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
        setCardCount(10);
        loadGame();
        break;
      }
      case 15: {
        setCardCount(15);
        loadGame();
        break;
      }
      case 30: {
        setCardCount(20);
        loadGame();
        break;
      }
      default: {
        return;
      }
    }
  }, [score, cardCount]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1 className='title'>The Meow-mory Game</h1>
      <div id='info' className='infoBar'>
        <Round className={'scoreCount'} cards={cardCount} />
        <Score className={'scoreCount'} score={score} record={highScore} />
      </div>
      {load === false ? (
        <Loading message='loading...' />
      ) : (
        <Loading message='' />
      )}
      <div id='gameContainer' className='gameboard'>
        {load === true && (
          <Images images={array1} onClick={handleClick} className={'card'} />
        )}
      </div>
      <p className='instructionText'>
        This game will test how good you can remember cats - a very important
        life skill! Each turn click on one cat, but only once per round! (You
        know how picky cats can be with their petting preferences...) Once you
        have selected all of them, you win the round and move onto the next! If
        you select a cat twice in the round, you lose!
      </p>
    </div>
  );
};

export default App;
