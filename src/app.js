'use strict';

const errorHandlers = require('./middleware/errors');
const userRoutes = require('./routes/user');
const collectionRoutes = require('./routes/collection');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
// const router = express.Router();
app.use(cors({ 
  credentials: true, 
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
// app.use(cors());
app.use(cookieParser())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(userRoutes);
app.use(collectionRoutes);


app.get('*', errorHandlers[404]);
app.use(errorHandlers[500]);

module.exports = {
  server: app,
  start: PORT => app.listen(PORT, () => console.log(`Server running on ${PORT}`))
}