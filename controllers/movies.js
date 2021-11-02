const Movies = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');

const Forbidden = require('../errors/forbidden');

const cathIdError = function (res, card) {
  if (!card) {
    throw new NotFoundError('Данные не найдены');
  }
  return res.send({ data: card });
};

exports.moviesGet = function (req, res, next) {
  Movies.find({ owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};
exports.moviesPost = function (req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((mov) => res.send({ data: mov }))
    .catch(next);
};

// удаление карточки
exports.moviesDel = function (req, res, next) {
  Movies.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Данные не найдены');
      }
      if (req.user._id != movie.owner._id) {
        throw new Forbidden('Доступ запрещён');
      }

      return Movies.findByIdAndRemove(req.params._id);
    })

    .then((movie) => cathIdError(res, movie))
    .catch(next);
};
