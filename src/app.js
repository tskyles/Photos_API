'use strict';


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json);
app.use(express.urlencoded({extended: true}));




app.

module.exports = {
  server: app,
  start: PORT => app.listen(PORT, () => console.log(`Server running on ${PORT}`))
}