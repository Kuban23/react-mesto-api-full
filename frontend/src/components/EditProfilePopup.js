import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

   // Подписываемся на контекст CurrentUserContext
   const currentUser = React.useContext(CurrentUserContext);

   // Управляемые компонеты
   const [name, setName] = React.useState('');
   const [description, setDescription] = React.useState('');

   // Обработчики изменения инпутов
   function handleChangeName(evt) {
      setName(evt.target.value);
   }

   function handleChangeDescription(evt) {
      setDescription(evt.target.value);
   }

   // Создал эффект который будет обновлять переменные состояния при изменении контекста //
   // После загрузки текущего пользователя из API, его данные будут использованы в управляемых компонентах.
   React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
   }, [currentUser, props.isOpen]);

   // Обработчик handleSubmit          
   function handleSubmit(evt) {
      // evt.preventDefault();
      // Передаем значения управляемых компонентов во внешний обработчик 
      props.onUpdateUser({
         name,
         about: description,
      });

   }


   return (
      //  <!-- Блок popup profile ----------------------------------------------------------------------------> */ 
      <PopupWithForm title='Редактировать профиль' name='profile' isOpen={props.isOpen} buttonTitleSubmit='Сохранить'
         onClose={props.onClose} onSubmit={handleSubmit}>

         <input className="popup__input popup__input_type_name" type="text" name="name" id="name-input"
            value={name || ''} onChange={handleChangeName} placeholder="Имя" required minLength="2" maxLength="40" />
         <span className="popup__input-error name-input-error"></span>
         <input className="popup__input popup__input_type_profession" type="text" name="about" id="profession-input"
            value={description || ''} onChange={handleChangeDescription} placeholder="Профессия" required minLength="2" maxLength="200" />
         <span className="popup__input-error profession-input-error"></span>

      </PopupWithForm>

   )
}

export default EditProfilePopup;