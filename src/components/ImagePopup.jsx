import React from 'react';

const ImagePopup = (props) => {
  return (
    <div className={`modal modal_type_image" ${props.isOpen ? 'modal_open' : ''}`} onClick={props.onCloseClick}>
      <figure className="modal__figure">
        <button className="modal__close-button link" type="button" title="Закрыть" onClick={props.onClose}></button>
        <img className="modal__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="modal__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;