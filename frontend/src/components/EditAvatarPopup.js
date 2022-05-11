import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

   // Записываем объект, возвращаемый хуком, в переменную
   const avatarRef = React.useRef();

   // Обработчик handleSubmit   
   function handleSubmit(evt) {
      // evt.preventDefault();
      // Передаем значения инпута, полученное с помощью рефа. 
      props.onUpdateAvatar({

         avatar: avatarRef.current.value,
      });

   }

   // После смены аватарки очищаем инпут в попапе
   React.useEffect(() => {
      avatarRef.current.value = '';
   }, [props.isOpen])


   return (
      <PopupWithForm title='Обновить аватар' name='avatar' isOpen={props.isOpen} buttonTitleSubmit='Сохранить'
         onClose={props.onClose} onSubmit={handleSubmit}>

         <input className="popup__input popup__input_type_link popup__input-avatar" name="link" id="avatar-link-input"
            type="url" placeholder="Ссылка на аватар" required ref={avatarRef} />
         <span className="popup__input-error avatar-link-input-error"></span>

      </PopupWithForm>
   )
}

export default EditAvatarPopup; 