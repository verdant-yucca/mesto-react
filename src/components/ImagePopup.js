import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image-fullscreen ${props.card && 'popup_active'}`}>
      <div className="popup__container-image-fullscreen">
        <img className="popup__image" src={props.card && props.card.link} alt={props.card && props.card.name} />
        <p className="popup__image-text">{props.card && props.card.name}</p>
        <button type="button" className="popup__button-close" onClick={props.onPopupClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
