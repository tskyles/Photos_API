'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user', enum: ['admin', 'editor', 'user']},
})

User.pre('save', async () => {
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
})

// TODO:
User.statics.authenticateBasic = function(userCreds){

}

module.exports = mongoose.model('User', User);