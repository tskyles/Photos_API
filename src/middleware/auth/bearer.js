'use strict';

const User = require('../../models/user');

const bearerAuth = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  try
  {
    let token = req.headers.authorization.split(' ').pop();

    let user = await User.authenticateToken();

  }
}