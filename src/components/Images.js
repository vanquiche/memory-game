import React from 'react';

export const Images = (props) => {
  let content = props.images;
  const styles = {
    cursor: 'pointer',
    height: 'auto',
    width: 400 };

  return (
    <div>
      {content.map((item, index) => (
        <img
          id={item}
          key={item + index}
          src={item.src}
          style={styles}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};
