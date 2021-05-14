import React from 'react';

export const Images = (props) => {
  const content = props.images;
 

  return (
    <div>
      {content.map((image, index) => (
        <img
          id={image.id}
          key={`${image.name}_${index}`}
          alt={image.alt}
          src={image.src}
          className={props.className}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};
