import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        name={'edit-profile'}
        title={'Редактировать профиль'}
        buttonText={'Сохранить'}
        children={(
          <>
            <input className="modal__input modal__input_type_name" type="text" name="name" id="userName" minlength="2" maxlength="40" placeholder="Имя" required />
            <span className="modal__input-error" id="userName-error"></span>
            <input className="modal__input modal__input_type_description" type="text" name="about" id="userjob" minlength="2" maxlength="200" placeholder="О себе" required />
            <span className="modal__input-error" id="userjob-error"></span>
          </>
        )}
      />
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        name={'add-element'}
        title={'Новое место'}
        buttonText={'Сохранить'}
        children={(
          <>
            <input className="modal__input modal__input_type_place" type="text" name="name" id="element-name" placeholder="Название" minlength="2" maxlength="30" required />
            <span className="modal__input-error" id="element-name-error"></span>
            <input className="modal__input modal__input_type_link" type="url" name="link" id="link" placeholder="Ссылка на картинку" required />
            <span className="modal__input-error" id="link-error"></span>
          </>
        )}
      />
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        name={'avatar'}
        title={'Обновить аватар'}
        buttonText={'Сохранить'}
        children={(
          <>
            <input className="modal__input modal__input_type_avatar" type="url" name="avatar" id="avatar" placeholder="Ссылка на аватар" required />
            <span className="modal__input-error" id="avatar-error"></span>
          </>
        )}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
      />

    </div>
  );
}

export default App;
