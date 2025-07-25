import React from 'react';
import './Card.css';

const Card = ({ title, image, description, actionText, actionLink }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {actionLink && (
          <a href={actionLink} className="card-action">
            {actionText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;