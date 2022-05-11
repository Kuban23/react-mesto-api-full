import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

   // Управляемые компонеты
   const [name, setName] = React.useState('')
   const [link, setLink] = React.useState('')

   // Обработчики изменения инпутов
   function handleChangeNamePlace(evt) {
      setName(evt.target.value);
   }

   function handleChangeLink(evt) {
      setLink(evt.target.value);
   }

   // Обработчик handleSubmit 
   function handleSubmit(evt) {
      // evt.preventDefault();
      // Передаем значения управляемых компонентов во внешний обработчик 
      props.onAddPlace({
         name,
         link: link,
      });
   }

   // После загрузки картинки очищаем инпуты в попапе
   React.useEffect(() => {
      setName('')
      setLink('')
   }, [props.isOpen])


   return (
      <PopupWithForm title='Новое место' name='image' isOpen={props.isOpen} buttonTitleSubmit='Создать'
         onClose={props.onClose} onSubmit={handleSubmit}>

         <input className="popup__input popup__input_type_name popup__input_type_title" name="name" type="text"
            id="title-input" placeholder="Название" required minLength="2" maxLength="30" value={name} onChange={handleChangeNamePlace} />
         <span className="popup__input-error title-input-error"></span>
         <input className="popup__input popup__input_type_profession popup__input_type_link" name="link" id="link-input"
            type="url" placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink} />
         <span className="popup__input-error link-input-error"></span>


      </PopupWithForm>
   )
}

export default AddPlacePopup;