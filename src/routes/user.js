'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');



const createUser = async (req, res, next) => {
  console.log(req.body);
  let user = new User(req.body);
  let savedUser = await user.save();

  res.status(200).send(savedUser);
}

router.post('/api/v1/users', createUser);

module.exports = router;