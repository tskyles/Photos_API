'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const basicAuth = require('../middleware/auth/basic');
const bearerAuth = require('../middleware/auth/bearer');

router.post('/api/v1/register', createUser);
router.post('/api/v1/signin/basic', basicAuth, signInUser);
router.post('/api/v1/signin/bearer', bearerAuth, signInUser);
router.get('/api/v1/signin', checkLoginStatus);
router.get('/api/v1/logout', logOutUser);

function logOutUser(req, res){
  res.status(200)
    .cookie('access_token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send('User Logged Out')
}

async function checkLoginStatus(req, res, next){
  let token = req.cookies['access_token'];

  let user = await User.authenticateToken(token)
  if (!user) {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }
  user = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    _id: user._id
  }
  res.status(200).send(user);
}


async function createUser(req, res, next){
  let user = new User(req.body);
  let savedUser = await user.save();

  res.status(200).send(savedUser);
}

function signInUser(req, res, next){
  const user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    role: req.user.role,
    _id: req.user._id
  }

  res.status(200)
    .cookie('access_token', req.token, {
      httpOnly: true,
      maxAge: 604800000,
    })
    .send({
    user: user,
  });
}


module.exports = router;