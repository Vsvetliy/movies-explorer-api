const mongoose = require('mongoose');
const validator = require('../node_modules/validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 30,
  },

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
module.exports = mongoose.model('user', userSchema);
