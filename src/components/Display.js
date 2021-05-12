import React from 'react';

export const Display = (props) => {
  let content = props.message;

  return (
    <div>
      {content.map((item, index) => (
        <p
          id={item}
          key={item + index}
          style={{ cursor: 'pointer' }}
          onClick={props.onClick}
        >
          {item}
        </p>
      ))}
    </div>
  );
};
