
export const BASE_URL = 'https://auth.nomoreparties.co';

// Проверка-обработка ответа
const checkResponse = (res) => {
   if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`); // если ошибка, отклоняем промис
   }
   return res.json();
};

// Функция для запроса регистрации пользователя
export const register = (email, password) => {
   return (fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })

   })
      .then(checkResponse)
   )
}

// Функция для запроса авторизации пользователя
export const authorize = (email, password) => {
   return (fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
   })
      .then(checkResponse)
   )
}

// Функция для проверки валидности токена
export const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}

	})
		.then(checkResponse)
}