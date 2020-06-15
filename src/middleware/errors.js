'use strict';

//TODO: Write better error handling
module.exports = {
  404: (req, res, next) => {
    let error = { error: '404: Resource Not Found' };
    res.status(404).send(error);
  },

  500: (req, res, next) => {
    let error = { error: '500: Internal Server Error' };
    res.status(500).send(error);
  }
}