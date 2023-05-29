import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmCardDeletePopup = ({ isOpen, onClose, onCloseClick, onCardDelete }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();

    onCardDelete();
    onClose();
  }

  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onCloseClick={onCloseClick}
      name={'confirm'}
      title={'Вы уверены?'}
      buttonText={'Да'}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmCardDeletePopup;