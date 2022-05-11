import React from 'react';

function ImagePopup(props) {

   return (
      // <section className={`popup popup_type_image ${props.isOpened ? 'popup_opened' : ''}`}>
      <section className={`popup popup_type_image ${props.isOpened && 'popup_opened'}`}>
         <div className="popup__container-image">
            <button className="popup__close popup__close_type_emage" onClick={props.onClose} type="button" aria-label="Кнопка закрытия окна"></button>
            <figure className="popup__group">
               <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
               <figcaption className="popup__title-image">{props.card ? props.card.name : ''}</figcaption>
            </figure>
         </div>
      </section>

   );


};

export default ImagePopup;