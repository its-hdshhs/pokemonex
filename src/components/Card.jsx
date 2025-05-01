import React from 'react';
import '../styles/Card.css';

const Card = ({ name, image, types, id }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <h2 className="card-title">{name}</h2>
      <p className="card-id">ID: {id}</p>
      <div className="card-types">
        {types.map((type, index) => (
          <span key={index} className={`type-badge type-${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;