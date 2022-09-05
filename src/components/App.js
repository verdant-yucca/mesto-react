import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import PopupWithConfirmation from './PopupWithConfirmation'
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCardDelete, setSelectedCardDelete] = useState(null);

  const onError = err => console.log(`Ошибка: ${err}`);

  useEffect(() => {
    api.getAppInfo()
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(err => onError(err));
  }, [])

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = card => setSelectedCard(card);

  const handleConfirmClick = card => {
    setIsConfirmPopupOpen(true);
    setSelectedCardDelete(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setSelectedCardDelete(null);
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => setCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
      .catch(err => onError(err));
  };

  const handleCardDelete = card => {
    api.deleteCard(card._id)
      .then(() => setCards((state) => state.filter(item => item._id !== card._id)))
      .catch(err => onError(err))
      .finally(() => closeAllPopups());
  };

  const handleAddPlaceSubmit = (name, info) => {
    setIsLoading(true);
    api.addCard(name, info)
      .then(newCard => setCards([newCard, ...cards]))
      .catch(err => onError(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  };

  const handleUpdateUser = data => {
    setIsLoading(true);
    console.log(data)
    api.editProfile(data)
      .then(result => setCurrentUser(result))
      .catch(err => onError(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  };

  const handleUpdateAvatar = url => {
    setIsLoading(true);
    api.editAvatar(url)
      .then(result => setCurrentUser(result))
      .catch(err => onError(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
              onConfirm={handleConfirmClick} onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onPopupClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser} isLoading={isLoading} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onPopupClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onPopupClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

        <PopupWithConfirmation isOpen={isConfirmPopupOpen} onPopupClose={closeAllPopups}
                               card={selectedCardDelete} onCardDelete={handleCardDelete} />

        <ImagePopup card={selectedCard} onPopupClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
