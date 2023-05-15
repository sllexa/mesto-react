import React from 'react';

const PopupWithForm = ({name, title, isOpen, onCloseClick, onClose, buttonText, children}) => {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? 'modal_open' : ''}`} onClick={onCloseClick}>
      <div className="modal__container">
        <button className="modal__close-button link" type="button" title="Закрыть" onClick={onClose}></button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name}>
          {children}
          <button className="modal__button-save" type="submit" title="Сохранить">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;