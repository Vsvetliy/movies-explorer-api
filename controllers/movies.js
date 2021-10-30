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
  Movies.find({})
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
  // const owner = req.user._id;
  const owner = '6171b4a7225ba4df21b08501';
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
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Данные не найдены');
      }

      // if (req.user._id != movie.owner._id) {
      //   throw new Forbidden('Доступ запрещён');
      // }
      return Movies.findByIdAndRemove(req.params.movieId);
    })

    .then((movie) => cathIdError(res, movie))
    .catch(next);
};

exports.moviesAddLikes = function (req, res, next) {
  Movies.findByIdAndUpdate(

    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )

    .then((card) => cathIdError(res, card))
    .catch(next);
};

exports.moviesDelLikes = function (req, res, next) {
  Movies.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => cathIdError(res, card))
    .catch(next);
};
