import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isActivePopupEditProfile, setIsActivePopupEditProfile] = React.useState(false)
  const [isActivePopupAddCards, setIsActivePopupAddCards] = React.useState(false)
  const [isActivePopupAvatarEdit, setIsActivePopupAvatarEdit] = React.useState(false)
  const [selectImageCard, setSelectImageCard] = React.useState(null)

  function handleEditProfile() {
    setIsActivePopupEditProfile(true);
  }

  function handleAddCard() {
    setIsActivePopupAddCards(true);
  }

  function handleEditAvatar() {
    setIsActivePopupAvatarEdit(true);
  }

  function closePopups() {
    setIsActivePopupAvatarEdit(false);
    setIsActivePopupEditProfile(false);
    setIsActivePopupAddCards(false);
    setSelectImageCard(null);
  }

  function openImageFullscreen(card) {
    setSelectImageCard(card);
  }

  return (
    <div className="page">
      <Header/>
      <Main editProfile={handleEditProfile} addCard={handleAddCard} editAvatar={handleEditAvatar}
            openImageFullscreen={openImageFullscreen}/>
      <Footer/>

      <PopupWithForm title="Редактировать профиль" name="form-edit-profile" buttonSave="Сохранить"
                     isOpen={isActivePopupEditProfile} onPopupClose={closePopups}>
        <input type="text" name="name" id="name-profile-input" className="popup__input popup__input_profile_name"
               placeholder="Имя профиля" required minLength="2" maxLength="40"/>
        <span className="popup__error name-profile-input-error"></span>
        <input type="text" name="info" id="info-input" className="popup__input popup__input_profile_info"
               placeholder="Информация" required minLength="2" maxLength="200"/>
        <span className="popup__error info-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="form-add-cards" buttonSave="Создать"
                     isOpen={isActivePopupAddCards} onPopupClose={closePopups}>
        <input type="text" name="name" id="name-mesto-input" className="popup__input popup__input_profile_name"
               placeholder="Название" required minLength="2" maxLength="30"/>
        <span className="popup__error name-mesto-input-error"></span>
        <input type="url" name="info" id="link-input" className="popup__input popup__input_profile_info"
               placeholder="Ссылка на картинку" required/>
        <span className="popup__error link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="form-edit-avatar" buttonSave="Сохранить"
                     isOpen={isActivePopupAvatarEdit} onPopupClose={closePopups}>
        <input type="url" name="url" id="link-avatar-input" className="popup__input popup__input_profile_info"
               placeholder="Ссылка на картинку" required/>
        <span className="popup__error link-avatar-input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="form-confirm" buttonSave="Да"/>
      <ImagePopup card={selectImageCard} onPopupClose={closePopups}/>
    </div>
  );
}

export default App;
