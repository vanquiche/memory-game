import React from 'react';
import cat1 from '../images/cat1.jpg';
import cat2 from '../images/cat2.jpg';
import cat3 from '../images/cat3.jpg';

export const Cards = () => {
  const cardStyle = {
    width: 200,
    height: 'auto',
  };

  let cards = [
    {
      src: cat1,
      alt: 'Cat 1',
      style: cardStyle,
    },
    {
      src: cat2,
      alt: 'Cat 2',
      style: cardStyle,
    },
    {
      src: cat3,
      alt: 'Cat 3',
      style: cardStyle,
    },
  ];

  function handleClick(e) {
    console.log(e.target.alt + ' clicked');
  }
  return (
    <div>
      {Object.values(cards).map((value, index) => {
        return (
          <img
            key={index}
            name={index}
            src={value.src}
            alt={value.alt}
            style={value.style}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
};
