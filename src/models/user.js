'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user', enum: ['admin', 'editor', 'user']},
})

User.pre('save', async function(){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
})

User.statics.authenticateBasic = async function(userCreds){
  let query = {email: userCreds.email};

  try
  {
    let user = await this.findOne(query);

    if(!user){
      return null;
    }

    let userAuthenticated = await user.comparePassword(userCreds.password);

    if(userAuthenticated){
      return user;
    }
    else{
      return null;
    }
  }
  catch(error)
  {
    {throw error;}
  }
}

User.statics.authenticateToken = async function(token){

}

User.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

User.methods.generateToken = function(){
  let token = {
    id: this._id,
    // TODO: define capabiliteis
    capabilities: capabilities[this.role],
    role: this.role,
  };

  return jwt.sign(token, process.env.JWTSECRET, {expiresIn: process.env.TOKEN_EXPIRES});
}

module.exports = mongoose.model('User', User);