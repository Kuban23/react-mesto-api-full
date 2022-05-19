class Api {

   constructor({ address, headers }) {
      this._address = address;
      this._headers = headers;
   }

   // Проверка ответа
   _checkResponse = (res) => {
      if (!res.ok) {
         return Promise.reject(`Error: ${res.status}`); // если ошибка, отклоняем промис
      }
      return res.json();
   };


   // Загрузка информации о пользователе
   getProfileUserInfo() {
      return fetch(`${this._address}/users/me`, {
         method: 'GET',
         headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
         }
      })
         .then(this._checkResponse);
   }

   // Загрузка карточек с сервера
   getLoadCards() {
      return fetch(`${this._address}/cards`, {
         method: 'GET',
         headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
         }
      })
         .then(this._checkResponse);
   }

   // Редактирование профиля
   redactProfile(data) {
      return fetch(`${this._address}/users/me`, {
         method: 'PATCH',
         headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: data.name,
            about: data.about,
         }),
      })
         .then(this._checkResponse);
   }

   // Добавление новой карточки
   addCard(data) {
      return fetch(`${this._address}/cards`, {
         method: 'POST',
         headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: data.name,
            link: data.link,
         })
      })
         .then(this._checkResponse);
   }

   // Удаления карточки
   deleteCard(id) {
      return fetch(`${this._address}/cards/${id}`, {
         method: 'DELETE',
         headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
         }
      })
         .then(this._checkResponse);
   }

   // Обновление аватарки
   redactAvatar(userAvatar) {
      return fetch(`${this._address}/users/me/avatar`, {
         method: 'PATCH',
         headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            avatar: userAvatar.avatar,
         }),
      })
         .then(this._checkResponse);
   }

   // Единый запрос постановки и удаления лайков
   changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._address}/cards/${id}/likes`, {
         method: isLiked ? 'PUT' : 'DELETE',
         headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
         },
      })
         .then(this._checkResponse);
   }

}

const api = new Api({
   address: 'https://react-mesto-api-full.nomoredomains.work',
   headers: {
      'Content-Type': 'application/json'
   }
});

export default api;