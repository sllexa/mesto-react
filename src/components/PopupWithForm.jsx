import React from 'react';

const PopupWithForm = (props) => {
  return (
    <div className={`modal modal_type_${props.name} ${props.isOpen ? 'modal_open' : ''}`} onClick={props.onCloseClick}>
      <div className="modal__container">
        <button className="modal__close-button link" type="button" title="Закрыть" onClick={props.onClose}></button>
        <h2 className="modal__title">{props.title}</h2>
        <form className="modal__form" name={props.name} noValidate>
          {props.children}
          <button className="modal__button-save" type="submit" title="Сохранить">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;