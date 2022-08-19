import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <Header/>
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}/>
      <Footer/>

      <PopupWithForm title="Редактировать профиль" name="form-edit-profile" buttonSave="Сохранить"
                     isOpen={isEditProfilePopupOpen} onPopupClose={closeAllPopups}>
        <input type="text" name="name" id="name-profile-input" className="popup__input popup__input_profile_name"
               placeholder="Имя профиля" required minLength="2" maxLength="40"/>
        <span className="popup__error name-profile-input-error"></span>
        <input type="text" name="info" id="info-input" className="popup__input popup__input_profile_info"
               placeholder="Информация" required minLength="2" maxLength="200"/>
        <span className="popup__error info-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="form-add-cards" buttonSave="Создать"
                     isOpen={isAddPlacePopupOpen} onPopupClose={closeAllPopups}>
        <input type="text" name="name" id="name-mesto-input" className="popup__input popup__input_profile_name"
               placeholder="Название" required minLength="2" maxLength="30"/>
        <span className="popup__error name-mesto-input-error"></span>
        <input type="url" name="info" id="link-input" className="popup__input popup__input_profile_info"
               placeholder="Ссылка на картинку" required/>
        <span className="popup__error link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="form-edit-avatar" buttonSave="Сохранить"
                     isOpen={isEditAvatarPopupOpen} onPopupClose={closeAllPopups}>
        <input type="url" name="url" id="link-avatar-input" className="popup__input popup__input_profile_info"
               placeholder="Ссылка на картинку" required/>
        <span className="popup__error link-avatar-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="form-confirm" buttonSave="Да"/>
      <ImagePopup card={selectedCard} onPopupClose={closeAllPopups}/>
    </div>
  );
}

export default App;
