'use strict';

const mongoose = require('mongoose');

const Collection = new mongoose.Schema({
  name: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, required: true },
  users: { type: Array, default: [] },
  posts: { type: Array, default: [] },
  private_only: { type: Boolean, required: true, default: true },
})

module.exports = mongoose.model('Collection', Collection);