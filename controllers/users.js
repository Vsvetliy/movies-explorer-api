const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const LoginPasswordError = require('../errors/login-password-error');
const ConflictErr = require('../errors/conflictErr');

const formattedUser = function (user) {
  return {
    name: user.name,
    about: user.about,
    id: user.id,
    avatar: user.avatar,
    email: user.email,
  };
};

const cathIdError = function (res, user) {
  if (!user) {
    throw new NotFoundError('Данные не найдены');
  }
  return res.send({ data: formattedUser(user) });
};

exports.usersGet = function (req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users.map(formattedUser) }))
    .catch(next);
};

exports.usersGetId = function (req, res, next) {
  User.findById(req.params.id)
    .then((user) => cathIdError(res, user))
    .catch(next);
};

exports.usersGetMe = function (req, res, next) {
  User.findById(req.user._id)

    .then((user) => cathIdError(res, user))
    .catch(next);
};

exports.usersLogin = function (req, res, next) {
  const { email, password } = req.body;
  let findedUser;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new LoginPasswordError('Неправильные почта или пароль');
      }

      findedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new LoginPasswordError('Неправильные почта или пароль');
      }
      console.log("JWT_SECRET")
console.log(JWT_SECRET)
      // создадим токен
      const token = jwt.sign({ _id: findedUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

exports.usersPost = function (req, res, next) {
  const {
    name, about, avatar, email,
  } = req.body;
  if (!req.body.password || req.body.password.length < 3) {
    throw new ValidationError('Слишком короткий пароль');
  }
  if (!validator.isEmail(req.body.email)) {
    throw new ValidationError('Некорректный email');
  }

  User.findOne({ email: req.body.email })
    .then((oldUser) => {
      if (oldUser) {
        throw new ConflictErr('Пользователь с таким email уже существует');
      }

      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => User.create({

      name, about, avatar, email, password: hash,
    }))

    .then((user) => res.send({ data: formattedUser(user) }))

    .catch(next);
};

exports.usersPatch = function (req, res, next) {
  if (!req.body.email) {
    throw new ValidationError('Не заполнен email');
  }

  User.findOne({ email: req.body.email })
  .then((oldUser) => {
    if (oldUser) {
      throw new ConflictErr('Пользователь с таким email уже существует');
    }

  })
  .then(() => {
    User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, email: req.body.email },
      { new: true, runValidators: true }
    )
    .then((user) => cathIdError(res, user))
  })



    .catch(next);
};
