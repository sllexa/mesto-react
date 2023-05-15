import React from 'react';

const Card = ({card, onCardClick}) => {
  
  const { name, link, likes } = card;

  return (
    <article className="element">
      <button className="element__delete-button link" type="button" aria-label="Удалить"></button>
      <img className="element__image" src={link} alt={name} onClick={() => onCardClick(card)}/>
      <h2 className="element__title">{name}</h2>
      <div className="element__like-container">
        <button type="button" className="element__like" aria-label="Мне нравиться"></button>
        <p className="element__like-count">{likes.length}</p>
      </div>
    </article>
  );
}

export default Card;