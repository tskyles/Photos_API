'use strict';

const mongoose = require('mongoose');

const Collection = new mongoose.Schema({
  name: {type: String, required: true },
  date_created: { type: Date, default: Date.now },
  created_by: { type: String, required: true },
  users: { type: Array, default: [] },
  posts: {type: Array, default: [] },
})

module.exports = mongoose.model('Collection', Collection);