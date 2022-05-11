const jwt = require('jsonwebtoken');
const AuthentificationError = require('../errors/error_Authentification_401');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // убедимся, что он есть и начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthentificationError('Необходима авторизация.');
  }
  // если токен есть, берем его
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // payload = jwt.verify(token, 'some-secret-key');
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b'}`);
  } catch (err) {
    next(new AuthentificationError('Необходима авторизация.'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
