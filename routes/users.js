const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validator = require('../node_modules/validator');

const usersRout = express.Router();
const usersControl = require('../controllers/users');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

usersRout.get('/users/', usersControl.usersGet);

// возвращает информацию о пользователе (email и имя)
usersRout.get('/users/me', usersControl.usersGetMe);

usersRout.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), usersControl.usersGetId);

// обновляет информацию о пользователе (email и имя)
usersRout.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).max(30),

  }),
}), usersControl.usersPatch);

module.exports = usersRout;
