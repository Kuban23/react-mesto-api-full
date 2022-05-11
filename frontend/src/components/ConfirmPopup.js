import React from "react";
import PopupWithForm from './PopupWithForm';


function ConfirmPopup(props) {

   // Функция удаления карточки
   // function handleCardDeleteClick(evt) {
   //    evt.preventDefault();
   //    props.onCardDelete(props.card);
   // }

   return (
      <PopupWithForm title='Вы уверены?' name='confirm' buttonTitleSubmit='Да' isOpen={props.isOpen} 
      onClose={props.onClose}  onSubmit= {props.onCardDelete}>

      </PopupWithForm>
   )
}

export default ConfirmPopup;