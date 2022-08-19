import React from 'react';

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return(
    <li className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick}/>
      <div className="element__description">
        <h2 className="element__element-info">{props.card.name}</h2>
        <div className="element__like-container">
          <button type="button" className="element__button-like" aria-label="Кнопка лайк"></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="element__delete"></button>
    </li>
  )
}

export default Card;
