'use strict';

require('dotenv').config();
const server = require('./src/app.js');
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

server.start(process.env.PORT);

