'use strict';

const mongoose = require('mongoose');


const User = new mongoose.Schema({
  _id: {type: mongoose.ObjectId},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user', enum: ['admin', 'editor', 'user']},
})

module.export = mongoose.model('User', User);