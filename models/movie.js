const mongoose = require('mongoose');
const validator = require('../node_modules/validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,

  },
  director: {
    type: String,
    required: true,

  },
  duration: {
    type: Number,
    required: true,

  },
  year: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,

  },
  image: {
    type: String,
    required: true,

  },
  trailer: {
    type: String,
    required: true,

  },
  // миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: true,

  },
  // id пользователя, который сохранил фильм
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,

  },
  nameEN: {
    type: String,
    required: true,

  },
  // avatar: {
  //   type: String,
  //   default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  //   validate: {
  //     validator(v) {
  //       return validator.isURL(v);
  //     },
  //   },

  // },
  // about: {
  //   type: String,
  //   minlength: 2,
  //   maxlength: 30,
  //   default: 'Исследователь',
  // },
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    minlength: 2,
    required: true,
    select: false,
  },
});
module.exports = mongoose.model('user', movieSchema);
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     minlength: 2,
//     maxlength: 30,
//     default: 'Жак-Ив Кусто',
//   },
//   // avatar: {
//   //   type: String,
//   //   default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
//   //   validate: {
//   //     validator(v) {
//   //       return validator.isURL(v);
//   //     },
//   //   },

//   // },
//   // about: {
//   //   type: String,
//   //   minlength: 2,
//   //   maxlength: 30,
//   //   default: 'Исследователь',
//   // },
//   email: {
//     type: String,
//     minlength: 2,
//     maxlength: 30,
//     required: true,
//     unique: true,
//     validate: {
//       validator(v) {
//         return validator.isEmail(v);
//       },
//     },
//   },
//   password: {
//     type: String,
//     minlength: 2,
//     required: true,
//     select: false,
//   },
// });
// module.exports = mongoose.model('user', userSchema);
