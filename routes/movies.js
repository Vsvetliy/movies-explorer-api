const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const moviesRout = express.Router();
const moviesControl = require('../controllers/movies');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

moviesRout.get('/movies/', moviesControl.moviesGet);

// POST /movies создаёт фильм с переданными в теле
moviesRout.post('/movies/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(300),
    image: Joi.string().required().custom(validateURL),
    trailer: Joi.string().required().custom(validateURL),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    thumbnail: Joi.string().required().custom(validateURL),
    movieId: Joi.number().required(),
  }),
}), moviesControl.moviesPost);

moviesRout.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string(),
  }),
}),
moviesControl.moviesDel);

module.exports = moviesRout;
