const express = require('express');
const { celebrate, Joi } = require('celebrate');

const usersRout = express.Router();
const usersControl = require('../controllers/users');

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
