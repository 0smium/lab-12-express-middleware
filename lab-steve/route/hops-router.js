'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Hop = require('../model/hops.js');

let hopsRouter = module.exports = new Router();

hopsRouter.post('/api/hops', jsonParser, (req, res, next) => {
  console.log('POST /api/hops');
  new Hop(req.body)
    .save()
    .then(hop => res.status(201).json(hop))
    .catch(next);
});

hopsRouter.get('/api/hops', (req, res, next) => {
  console.log('GET /api/hops');
  Hop.find()
    .then(hops => hops.map(hop => hop._id))
    .then(ids => res.status(200).json(ids))
    .catch(next);
});

hopsRouter.get('/api/hops/:id', (req, res, next) => {
  console.log('GET /api/hops/:id');
  Hop.findById(req.params.id)
    .then(hop => res.status(200).json(hop))
    .catch(next);
});

hopsRouter.put('/api/hops/:id', jsonParser, (req, res, next) => {
  console.log('PUT /api/hips:id');

  let options = {
    runValidator: true,
    new: true,
  };

  Hop.findByIdAndUpdate(req.params.id, req.body, options)
    .then(hop => res.status(202).json(hop))
    .catch(next);
});

hopsRouter.delete('/api/hops/:id', (req, res, next) => {
  console.log('DELETE /api/hops/:id');
  Hop.findByIdAndRemove(req.parama.id, req.body)
    .then(() => res.status(204).send('deleted record'))
    .catch(next);
});

//extra method to delete all records for the resource
hopsRouter.delete('/api/hops', (req, res, next => {
  console.log('DELETE api/hops');
  Hop.Remove()
    .then(() => res.status(204).send('deleted all records for the resource'))
    .catch(next);
}));
