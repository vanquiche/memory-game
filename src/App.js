import React, { useState, useEffect } from 'react';
import { Display } from './components/Display';

// this is my container and logic
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
  const [highScore, setHighScore] = useState(0);

  function loadArr(amount = 10) {
    setLoad(false);
    const index = Math.floor(Math.random() * myMessages.length);
    let newValue = myMessages.slice(index, index + amount);
    setArray1(newValue);
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
      setScore(score - 1);
    } else setScore(score + 1);
  }
  // re-deal cards and shuffle
  function nextRound() {

  }
  // check for losing condition and store high school
  function gameOver() {

  }

  useEffect(() => {
    setTimeout(() => {
      loadArr();
      setLoad(true);
    }, 2000);
  }, []);

  return (
    <div>
      <h1>A Game of Memory</h1>
      {load === false ? (
        <Loading message='loading...' />
      ) : (
        <Loading message='' />
      )}
      {load === true && <Display
      message={array1}
      onClick={shuffleCard} />}
      <ul>
        {Object.entries(click).map(([key, value], i) => (
          <li key={i}>{`${key}: ${value}`}</li>
        ))}
      </ul>
      <p>{score}</p>
    </div>
  );
};

export default App;
