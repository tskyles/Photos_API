'use strict';

const User = require('../../models/user');

async function verifyCookie(req, res, next){
  if(!req.cookies['access_token']){
    return res.status(401).send({ message: 'No Saved Credentials'})
  }

  try
  {
    let token = req.cookies['access_token'];
    let user = await User.authenticateToken(token)
    if (!user) {
      return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }
    req.user = user;
    next();
  }
  catch(error)
  {
    next(error);
  }

}

module.exports = verifyCookie;