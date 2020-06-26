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

function checkLoginStatus(req, res, next){
  console.log(req.cookies);
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
  res.cookie('access_token', req.token, {
    httpOnly: true,
    maxAge: 604800000,
  });
  console.log('cookie', res);
  res.status(200).send({
    user: user,
    token: req.token
  });
}


module.exports = router;