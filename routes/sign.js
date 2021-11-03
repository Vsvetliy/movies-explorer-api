const express = require('express');
const validator = require('validator');

const signRout = express.Router();
const { celebrate, Joi } = require('celebrate');
const usersControl = require('../controllers/users');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

signRout.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(2)
      .max(30),
    password: Joi.string().required().min(2),
  }),
}), usersControl.usersLogin);

signRout.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email().min(2)
      .max(30),
    password: Joi.string().required().min(2),
  }),
}), usersControl.usersPost);
module.exports = signRout;
