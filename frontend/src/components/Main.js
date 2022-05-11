import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

   // Подписываемся на контекст CurrentUserContext
   const currentUser = React.useContext(CurrentUserContext);


   return (

      <main className="content">

         {/* <!--Блок profile ----------------------------------------------------------------------------> */}
         <section className="profile">
            <div className="profile__image" onClick={props.onEditAvatar}>
               <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
               {/* <img className="profile__avatar" src='currentUser.avatar'/> */}
            </div>
            <div className="profile__info">
               <div className="profile__wrapper">
                  <h1 className="profile__name">{currentUser.name}</h1>
                  <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Кнопка редактирования профиля"></button>
               </div>
               <p className="profile__profession">{currentUser.about}</p>

            </div>
            <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="Кнопка для добавления фото"></button>
         </section>

         {/* <!--Блок elements ----------------------------------------------------------------------------> */}
         <section className="galery" >
            {props.cards.map((item) => {

               return (
                  <Card
                     card={item}
                     onCardClick={props.onCardClick}
                     key={item._id}
                     onCardLike={props.onCardLike}
                     //onCardDelete={props.onCardDelete}
                     cards={props.cards}
                     onConfirmPopup={props.onConfirmPopup}
                     onCardDelete={props.onCardDelete}
                  />
                  
               )
            })
            }

         </section>

      </main>



   );
}


export default Main;