'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const basicAuth = require('../middleware/auth/basic');
const bearerAuth = require('../middleware/auth/bearer');


const createUser = async (req, res, next) => {
  console.log(req.body);
  let user = new User(req.body);

  let savedUser = await user.save();

  res.status(200).send(savedUser);
}

const createToken = (req, res, next) => {
  let token = req.user.generateToken();
  console.log(token);
}

router.post('/api/v1/users', createUser);
router.post('/api/v1/signin', basicAuth, createToken);
router.get('/api/v1/token', bearerAuth);

module.exports = router;