import React from 'react';

const ImagePopup = ({isOpen, onCloseClick, onClose, card}) => {
  return (
    <div className={`modal modal_type_image" ${isOpen ? 'modal_open' : ''}`} onClick={onCloseClick}>
      <figure className="modal__figure">
        <button className="modal__close-button link" type="button" title="Закрыть" onClick={onClose}></button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <figcaption className="modal__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;