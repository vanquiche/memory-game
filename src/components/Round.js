import React from 'react';

export const Round = (props) => {
    let message;
    const expr = props.cards;
    switch (expr) {
      case 5:
        message = 'Round 1';
        break;
      case 10:
        message = 'Round 2';
        break;
      case 15:
        message = 'Round 3';
        break;
      case 20:
        message = 'Round 4';
        break;
      default:
        message = 'hello';
        break;
    }

  return <h3 className={props.className}>{message}</h3>;
};
