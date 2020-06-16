'use strict';

const mongoose = require('mongoose');


const User = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user', enum: ['admin', 'editor', 'user']},
})

module.exports = mongoose.model('User', User);