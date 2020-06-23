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

app.use(cors());
app.use(cookieParser())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(userRoutes);
app.use(collectionRoutes);

// app.get('/', (req, res) => {
//   res.send('hello World')
// })
// router.post('/users', (req, res, next) => {

// })

app.get('*', errorHandlers[404]);
app.use(errorHandlers[500]);

module.exports = {
  server: app,
  start: PORT => app.listen(PORT, () => console.log(`Server running on ${PORT}`))
}