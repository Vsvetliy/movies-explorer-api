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

moviesRout.get('/', moviesControl.moviesGet);

// POST /movies создаёт фильм с переданными в теле
moviesRout.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.string().required().min(2).max(30),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().required().min(2).max(30),
    trailer: Joi.string().required().min(2).max(30),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    thumbnail: Joi.string().required().min(2).max(30),
    movieId: Joi.string().required().min(2).max(30),
  }),
}), moviesControl.moviesPost);

moviesRout.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}),
moviesControl.moviesDel);

module.exports = moviesRout;
