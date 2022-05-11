import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/Auth';

function App() {

   // Переменные состояния, нужны для для видимости попапов.
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
   const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
   const [isConfirmPopup, setIsConfirmPopup] = React.useState(false);

   // Состояние карточки
   const [selectedCard, setSelectedCard] = React.useState(null);

   // Состояние авторизации пользователя(вошел в систему или нет)
   const [loggedIn, setloggedIn] = React.useState(false);

   // остояние открытого попапа который информирует об успешной или не очень регистрации
   const [isInfoTooltip, setInfoTooltip] = React.useState(false);

   // Состояние попапа при успешной/неудачной регистрации
   const [isRegister, setIsRegister] = React.useState(false);

   // Переменные состояния cards
   const [cards, setCards] = React.useState([]);

   // Переменная состояния для текущего пользователя.
   const [currentUser, setCurrentUser] = React.useState({});

   // Состояние email пользователя
   const [email, setEmail] = React.useState('');

   // Переменная для работы с useHistory
   const history = useHistory();

   // Эффект который будет вызывать getProfileUserInfo() и getLoadCards(), обновлять стейт переменную 
   // из полученного значения и загрузку карточек с сервера. 
   React.useEffect(() => {
      if (loggedIn) { // Делаю проверку залогинился ли пользователь (не понял как реализовать проверку с currentUser)
         Promise.all([ // в Promise.all передаем массив промисов которые нужно выполнить
            api.getProfileUserInfo(),
            api.getLoadCards()
         ])
            .then(([userData, cardsData]) => {
               setCurrentUser(userData)
               setCards(cardsData)
               closeAllPopup()
            })
            .catch((error) => {
               console.log(error);
            })
      }

   }, [loggedIn]);

   //Проверяем есть ли токен в хранилище (делаем 1 раз при монтировании компоненты, 
   // + мы устраняем выход с профиля при перезагрузке страницы)
   React.useEffect(() => {
      checkTokenlocalStorage();
   }, [])

   // Обработчики для переменных состояния, стэйтовые переменные.
   function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
   };

   function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
   };

   function handleEditPlaceClick() {
      setIsAddPlacePopupOpen(true);
   };

   function handleCardClick(data) {
      setSelectedCard(data);
      setIsImagePopupOpen(true);
   };

   // Функция подтверждения удаления
   function handleConfirmPopup() {
      setIsConfirmPopup(true);
   }

   // Функция удаления карточки 
   function handleCardDeleteClick(card) {
      setSelectedCard(card);
      setIsConfirmPopup(true);
   }

   // Закрываем все попапы
   function closeAllPopup() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsImagePopupOpen(false);
      setIsConfirmPopup(false);
      setInfoTooltip(false);
   }

   // Обработчик для изменения профайла 
   function handleUpdateUser(data) {
      api.redactProfile(data)
         .then((currentUserData) => {
            setCurrentUser(currentUserData)
            closeAllPopup()
         })
         .catch((error) => {
            console.log(error);
         })
   }

   // Обработчик для изменения аватара
   function handleUpdateAvatar({ avatar }) {
      api.redactAvatar({ avatar })
         .then((currentUserData) => {
            setCurrentUser(currentUserData)
            closeAllPopup()
         })
         .catch((error) => {
            console.log(error);
         })
   }

   // Реализация постновки и удаления лайков
   function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);

      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked)
         .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
         })
         .catch((error) => {
            console.log(error);
         });
   }

   // Реализация удаления карточки
   function handleCardDelete(card) {
      // Отправляю запрос в API и получаю массив, исключаю из него удалённую карточку
      api.deleteCard(card._id)
         .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
            closeAllPopup()
         })
         .catch((error) => {
            console.log(error);
         })
   }

   // Запрос API добавление новой карточки
   function handleAddPlaceSubmit(data) {
      api.addCard(data)
         .then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopup()
         })
         .catch((error) => {
            console.log(error);
         });
   }

   //Реализация закрытия popup по клавише Esc и клике по оверлей
   React.useEffect(() => {

      function handleEscClosePopup(evt) {
         evt.key == 'Escape' && closeAllPopup();
      }

      function handleOverlayClosePopup(evt) {
         evt.target.classList.contains('popup_opened') && closeAllPopup();
      }

      window.addEventListener('keydown', handleEscClosePopup);
      window.addEventListener('click', handleOverlayClosePopup);

      return () => {
         window.removeEventListener('keydown', handleEscClosePopup);
         window.removeEventListener('click', handleOverlayClosePopup);
      }

   }, [])

   //  Функция регистрации пользователя
   function hendleRegister(email, password) {
      auth.register(email, password)
         .then((data) => { // получаем попап для подтверждения или отклонения регистрации, узнаем, есть ли в присланных данных email
            if (data) {
               setInfoTooltip(true); // прописываем стэйты попапа
               setIsRegister(true);
            }
            history.push('/sign-in')  // переходим на страницу входа
         })
         .catch((error) => {
            console.log(error);
            setInfoTooltip(true);
            setIsRegister(false);
         })
   }

   // Функция для залогивания пользователя
   function handleLogin(email, password) {
      auth.authorize(email, password)
         .then((data) => {
            if (data.token) { // проверяем есть ли присланных данных Токен
               setloggedIn(true);
               setEmail(email);
               history.push('/')
               localStorage.setItem('jwt', data.token);
            }
            // history.push('/')
         })
         .catch((error) => {
            console.log(error);
            setIsRegister(false);
            setInfoTooltip(true);
         });
   }

   // Функция для выхода из профиля
   function handleSignOut() {
      history.push('/sign-in')
      localStorage.removeItem('jwt');
   }

   // Функция для поиска токена в localStorage
   function checkTokenlocalStorage() {
      const jwt = localStorage.getItem('jwt'); // сохраняем токен из localStorage и сохр. в переменную
      if (jwt) { // Если токен есть, то залогиниваемся
         auth.checkToken(jwt)
            .then((res) => {
               if (res.data.email) {
                  setEmail(res.data.email);
               }
               setloggedIn(true);
               history.push('/')

            })
            .catch((error) => {
               console.log(error);
            });
      }
   }

   return (
      <CurrentUserContext.Provider value={currentUser}>

         <div className='background'>
            <div className="page">

               <Header
                  handleSignOut={handleSignOut}
                  email={email}
               />

               <Switch>
                  <Route path='/sign-in'>
                     <Login
                        handleLogin={handleLogin}
                     />
                  </Route>

                  <Route path='/sign-up'>
                     <Register
                        hendleRegister={hendleRegister}
                     />
                  </Route>

                  <ProtectedRoute
                     exact path='/'
                     onEditAvatar={handleEditAvatarClick}
                     onEditProfile={handleEditProfileClick}
                     onAddPlace={handleEditPlaceClick}
                     onCardClick={handleCardClick}
                     cards={cards}
                     onCardLike={handleCardLike}
                     //onCardDelete={handleCardDelete}
                     onConfirmPopup={handleConfirmPopup}
                     //onImagePopup={handlePopupImageOpen}
                     onCardDelete={handleCardDeleteClick}
                     component={Main}
                     loggedIn={loggedIn}
                     email={email}
                  />

                  <Route>
                     {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
                  </Route>

               </Switch>

               <Footer />

               <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopup}
                  isOpened={isImagePopupOpen}
               />

               <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopup}
                  onUpdateUser={handleUpdateUser}
               />

               <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopup}
                  onUpdateAvatar={handleUpdateAvatar}
               />

               <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopup}
                  onAddPlace={handleAddPlaceSubmit}
               />

               <ConfirmPopup
                  isOpen={isConfirmPopup}
                  onClose={closeAllPopup}
                  onCardDelete={() => handleCardDelete(selectedCard)}
               />

               <InfoTooltip
                  isOpen={isInfoTooltip}
                  onClose={closeAllPopup}
                  onSuccess={isRegister}
                  name='infoTooltip'
               />

            </div>
         </div>

      </CurrentUserContext.Provider>
   );
}

export default App;
