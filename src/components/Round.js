import React from 'react';

export const Round = (props) => {
    let message;
    const expr = props.cards;
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
        message = 'hello';
        break;
    }

  return <h3>{message}</h3>;
};
