import React from 'react';

export const Images = (props) => {
  const content = props.images;
  const styles = {
    cursor: 'pointer',
    height: 'auto',
    width: 250 };

  return (
    <div>
      {content.map((image, index) => (
        <img
          id={image.id}
          key={`${image.name}_${index}`}
          alt={image.alt}
          src={image.src}
          style={styles}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};
