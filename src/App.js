import React, { useState, useEffect } from 'react';
import {Images} from './components/Images';
import {catImages} from './components/ImgSrc';


// offset this as its own component
const Loading = (props) => {
  return <p>{props.message}</p>;
};

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
      // let index = Math.floor(Math.random() * myMessages.length);
      // if (index >= myMessages.length - 5) index = myMessages.length - 10;
      const newArr = catImages;
      setLoad(true);
      return newArr;
    });
  }
  // improve your shuffle function
  function shuffleCard(e) {
    let item = e.target.id;
    clickItem(item);
    const shuffleArr = array1.sort(() => (Math.random() > 0.5 ? 1 : -1));
    setArray1([...shuffleArr]);
  }
  // accepts the target ID
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

  // offset this as its own component
  function displayRound() {
    // decides round number by cards in play
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
      default:
        message = '';
        break;
    }
    return message;
  }

  useEffect(() => {
    console.log('useEffect begins');
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
      {/* put ths in a header component */}
      {/* displayRound should be a component */}
      <h3>{displayRound()}</h3>
      <p>
        score: {score} record: {highScore}
      </p>
      <p>card count: {cardCount}</p>
      {/* loading component here */}
      {load === false ? (
        <Loading message='loading...' />
      ) : (
        <Loading message='' />
      )}
      {/* output display component */}
      {load === true && <Images images={catImages} onClick={shuffleCard} />}
      {/* new game button */}
      <button onClick={loadGame}>new game</button>
    </div>
  );
};

export default App;
