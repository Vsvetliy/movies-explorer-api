const mongoose = require('mongoose');
const validator = require('../node_modules/validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
   // required: true,

  },
  director: {
    type: String,
    //required: true,

  },
  duration: {
    type: Number,
    //required: true,

  },
  year: {
    type: String,
  //  required: true,

  },
  description: {
    type: String,
   // required: true,

  },
  image: {
    type: String,
//required: true,

  },
  trailer: {
    type: String,
  //  required: true,

  },
  // миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    //required: true,

  },
  // id пользователя, который сохранил фильм
  owner: {
    type: String,
    //type: mongoose.Schema.Types.ObjectId,
   // required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: String,
    //type: mongoose.Schema.Types.ObjectId,
   // required: true,
  },
  nameRU: {
    type: String,
   // required: true,

  },
  nameEN: {
    type: String,
    //required: true,

  },

});
module.exports = mongoose.model('movie', movieSchema);
