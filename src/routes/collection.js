const express = require('express');
const router = express.Router();

const Collection = require('../models/collection');
const bearerAuth = require('../middleware/auth/bearer');

router.post('/api/v1/collections', bearerAuth, createCollection);

async function createCollection(req, res, next){
  let collection = new Collection(req.body);
  let savedCollection = await collection.save();
  
  res.status(200).send(savedCollection);
}

