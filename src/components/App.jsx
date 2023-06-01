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
      }).catch(console.error)
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

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({});
  }

  const handleCardLike = (card) => {
    function makeRequest() {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      const method = isLiked ? 'DELETE' : 'PUT';

      return api.setLikedCard(card._id, method).then(res => setCards(state => state.map(c => c._id === card._id ? res : c)));
    }
    handleSubmit(makeRequest);
  }

  const handleCardDelete = () => {
    function makeRequest() {
      return api.deleteCard(cardDelete._id).then(setCards(array => array.filter(c => c._id !== cardDelete._id)));
    }
    handleSubmit(makeRequest);
  }

  const handleProfileFormSubmit = (name, about) => {
    function makeRequest() {
      return api.setProfile(name, about).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  const handleUpdateAvatar = (avatar) => {
    function makeRequest() {
      return api.setAvatar(avatar).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  const handleAddPlaceSubmit = (name, link) => {
    function makeRequest() {
      return api.addCard(name, link).then(res => setCards([res, ...cards]));
    }
    handleSubmit(makeRequest);
  }

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
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
        onEditProfile={handleProfileFormSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <ConfirmCardDeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
