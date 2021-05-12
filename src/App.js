import React, { useState, useEffect } from 'react';
import { Display } from './components/Display';

const myMessages = [
  'apple',
  'blueberry',
  'cucumber',
  'daikon',
  'eggplant',
  'figs',
  'garlic',
  'horse radish',
  'ivy',
  'kiwi',
  'lemon',
  'mandarin',
  'nectarine',
  'orange',
  'peach',
  'quince',
  'rhubarb',
  'strawberry',
  'turnip',
  'ugni',
  'vanilla',
  'watermelon',
  'zuchini',
];

const Loading = (props) => {
  return <p>{props.message}</p>;
};

const App = () => {
  // states
  const [array1, setArray1] = useState([]);
  const [load, setLoad] = useState(false);
  const [score, setScore] = useState(0);
  const [click, setClick] = useState({});
  const [cardCount, setCardCount] = useState(5);
  const [highScore, setHighScore] = useState(0);

  function fillArr() {
    let index = Math.floor(Math.random() * myMessages.length);
    if (index >= myMessages.length - 5) index = myMessages.length - 10;
    const newArr = myMessages.slice(index, index + cardCount);
    // console.log('loading array');
    return setLoad(true), newArr;
  }

  async function loadGame() {
    setLoad(false);
    setClick({});
    await setArray1(fillArr());
    console.log('game is loaded');
  }

  function shuffleCard(e) {
    let item = e.target.id;
    clickItem(item);
    const shuffleArr = array1.sort(() => (Math.random() > 0.5 ? 1 : -1));
    setArray1([...shuffleArr]);
  }

  function clickItem(name) {
    setClick((prev) => ({
      ...prev,
      [name]: true,
    }));
    if (click[name] === true) {
      endGame();
    } else setScore(score + 1);
  }

  function endGame() {
    setHighScore((prev) => {
      if (prev > score) return prev;
      else return score;
    });
    setScore(0);
  }

  function displayRound() {
    let message;
    const expr = cardCount;
    switch (expr) {
      case 5:
        message = 'Round 1';
        break;
      case 8:
        message = 'Round 2';
        break;
      case 11:
        message = 'Round 3';
        break;
    }
    return message;
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
    }
  }, [score, cardCount, highScore]);

  return (
    <div>
      <h1>A Game of Memory</h1>
      <h3>{displayRound()}</h3>
      <p>
        score: {score} record: {highScore}
      </p>
      {load === false ? (
        <Loading message='loading...' />
      ) : (
        <Loading message='' />
      )}
      {load === true && <Display message={array1} onClick={shuffleCard} />}
      <button onClick={loadGame}>new game</button>
    </div>
  );
};

export default App;
