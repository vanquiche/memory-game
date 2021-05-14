import React from 'react';

export const Score = (props) => {
  return (
    <p className={props.className}>
      score: {props.score} record: {props.record}
    </p>
  );
};
