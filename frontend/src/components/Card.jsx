import React from 'react';
import './Card.css';

const Card = ({ number, text, title }) => {
  return (
    <div className="card">
      <div className="card-header">
        {title && <h3 className="card-title">{title}</h3>}
        <span className="card-number">{number}</span>
      </div>
      <p className="card-text">{text}</p>
    </div>
  );
};

export default Card;