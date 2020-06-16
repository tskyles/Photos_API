'use strict';

const User = require('../../models/user');

const basicAuth = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1){
    return res.status(401).json({message: 'Missing Authorization Header'});
  }

  try
  {
    const authString = req.headers.authorization.split(' ').pop();
    const userCreds = _parseBasicString(authString);
    const user = await User.authenticateBasic(userCreds);
    if(!user){
      return res.status(401).json({message: 'Invalid Authentication Credentials'});
    }

    req.user = user;
    next();
  }
  catch(e)
  {
    next(e);
  }


}

function _parseBasicString(string) {
  let base64Buffer = Buffer.from(string, 'base64');
  let bufferString = base64Buffer.toString();
  let [email, password] = bufferString.split(':');
  let userCreds = { email, password };

  return userCreds
}


module.exports = basicAuth;