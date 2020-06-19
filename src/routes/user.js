'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const helpers = require('../helpers/helpers');
const basicAuth = require('../middleware/auth/basic');
const bearerAuth = require('../middleware/auth/bearer');


const createUser = async (req, res, next) => {
  console.log(req.body);
  let user = new User(req.body);

  let savedUser = await user.save();

  res.status(200).send(savedUser);
}

const signInUser = (req, res, next) => {
  res.cookie('access_token', req.token, {
    httpOnly: true,
    // maxAge: 2147483647,
  });
  const user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    role: req.user.role,
    _id: req.user._id
  }
  res.status(200).send({
    user: user,
    token: req.token
  });
}

router.post('/api/v1/register', createUser);
router.post('/api/v1/signin', basicAuth, signInUser);
router.get('/api/v1/token', bearerAuth);

module.exports = router;