// Подключаем express
const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const ERROR_NOT_FOUND = require('./errors/error_not_found_404');

// Подключаем контроллеры
const { login, createUser } = require('./controllers/users');

// Создаем приложение
const app = express();

// Выбирваем методы для работы спакетами
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger);

// Подключаем роуты
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

// Настраиваем и слушаем 3000 порт
const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Маршруты для регистрации и авторизации
// Валидация приходящих на сервер данных
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

// роут для регистрации
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .regex(
          /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/,
        ),
    }),
  }),
  createUser,
);

// Защита авторизацией всех маршрутов
app.use(auth);

// Подписываемся на маршруты
app.use(usersRoute);
app.use(cardsRoute);

app.use(errorLogger);

app.use('*', auth, (req, res, next) => {
  next(new ERROR_NOT_FOUND('Запрашиваемая страница не найдена'));
});

// Создал обработчик ошибок для celebrate
app.use(errors());

// Обработка всех ошибок централизованно serverError
app.use((err, req, res, next) => {
  // serverError(err, req, res, next);
  const { message } = err;
  // console.log(message);
  const statusCode = err.statusCode || 500;
  // проверяем статус, отправляем сообщение в зависимости от статуса
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка на сервере'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
