'use strict';

const mongoose = require('mongoose');


const Image = new mongoose.Schema({
  url: {type: String, required: true},
  author: {type: mongoose.ObjectId, ref: 'User', required: true},
  caption: {type: String},
  date_created: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Image', Image);