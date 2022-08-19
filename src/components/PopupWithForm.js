import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active': ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form name={`${props.name}`} className="popup__edit" noValidate>
          {props.children}
          <button type="submit" className="popup__button-save" >{props.buttonSave}</button>
        </form>
        <button type="button" className="popup__button-close" onClick={props.onPopupClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;


