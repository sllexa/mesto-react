import React from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmCardDeletePopup from './ConfirmCardDeletePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Loader from './Loader';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProfile(), api.getCards()])
      .then(([profile, listCards]) => {
        setCurrentUser(profile);
        setCards(listCards);
      }).catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleCardDeleteClick = (data) => {
    setCardDelete(data);
    setIsDeletePopupOpen(true);
  }

  const handlePopupCloseClick = (evt) => {
    if (evt.target.classList.contains('modal')) {
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({});
  }

  const handleCardLike = (card) => {
    setIsLoading(true);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const method = isLiked ? 'DELETE' : 'PUT';

    api.setLikedCard(card._id, method)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      }).catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  const handleCardDelete = () => {
    setIsLoading(true);
    api.deleteCard(cardDelete._id)
      .then(() =>{
        setCards(array => array.filter(c => c._id !== cardDelete._id));
      }).catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  const handleUpdateUser = (name, about) => {
    setIsLoading(true);
    api.setProfile(name, about)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      }).catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api.setAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  const handleAddPlaceSubmit = (name, link) => {
    setIsLoading(true);
    api.addCard(name, link)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      }).catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDeleteClick}
      />
      <Footer />
      <Loader isOpen={isLoading} />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
      />

      <ConfirmCardDeletePopup 
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        onCardDelete={handleCardDelete}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
