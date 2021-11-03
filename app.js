require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const usersRout = require('./routes/users');
const signRout = require('./routes/sign');
const moviesRout = require('./routes/movies');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://mesto.kolomeytsev.nomoredomains.club',
  'http://mesto.kolomeytsev.nomoredomains.club',
  'http://localhost:3000',
];

const { PORT = 3000 } = process.env;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(express.json());
// // логгер запросов
app.use(requestLogger);

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
  // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  if (method === 'OPTIONS') {
  // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
});
app.use(signRout);
app.use(auth);
app.use(usersRout);
app.use(moviesRout);

app.use('/*', () => {
  throw new NotFoundError('Cтраница не найдена');
});
//  логгер ошибок
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on porl ${PORT}`);
});
