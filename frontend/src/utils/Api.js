class Api {
   // constructor({ address, token }) {
   //    this._address = address;
   //    this._token = token;
   //    this._headers = {
   //       authorization: this._token,
   //       'Content-Type': 'application/json',
   //    };
   // }
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

// Добавление лайков
//   addLikes(id) {
//     return fetch(`${this._address}/cards/likes/${id}`, {
//       method: 'PUT',
//       headers: this._headers,
//     })
//       .then(this._checkResponse);
//   }

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

// Постановка и снятие лайка
//   deleteLikes(id) {
//     return fetch(`${this._address}/cards/likes/${id}`, {
//       method: 'DELETE',
//       headers: this._headers,
//     })
//       .then(this._checkResponse);
//   }

// Обновление аватарки
redactAvatar(userAvatar) {
   return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
         authorization: `Bearer ${localStorage.getItem('jwt')}`,
         'Content-Type': 'application/json'   
      },
      body: JSON.stringify({
         avatar: userAvatar,
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

// const api = new Api({
//    address: 'https://mesto.nomoreparties.co/v1/cohort-34',
//    token: '3e73d708-abda-497f-b5cd-226c9c586d8e',
// });
const api = new Api({
   address: 'https://react-mesto-api-full.nomoredomains.work',
   headers: {
      'Content-Type': 'application/json'
   }
});



export default api;