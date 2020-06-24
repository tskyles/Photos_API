'use strict';

const express = require('express');
const router = express.Router();

const Collection = require('../models/collection');
const bearerAuth = require('../middleware/auth/bearer');

router.post('/api/v1/collections', bearerAuth, createCollection);
router.get('/api/v1/collections/user/:id', getAllUserCollections);

async function createCollection(req, res, next){
  let duplicateCollection = await Collection.find({created_by: req.body.created_by, name: req.body.name});

  if(duplicateCollection.length > 0){
    res.status(409).send({error: '409: Resource already exists', message: 'Duplicate item found in DB'});
  }
  else {
    let collection = new Collection(req.body);
    let savedCollection = await collection.save();

    res.status(200).send(savedCollection);
  }

}

async function getAllUserCollections(req, res, next){
  let collections = await Collection.find({created_by: req.params.id});

  if(!collections){
    res.status(404).send({message: '404: Resource not found'});
  }
  else{
    res.status(200).send(collections);
  }

}

module.exports = router;
