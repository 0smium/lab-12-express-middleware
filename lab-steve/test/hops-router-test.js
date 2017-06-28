'use strict';

require('dotenv').config({path: './test/.env'});
const request = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempHop;

describe('testing hop routes', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/hops', () => {
    it('should respond with a 200 status code and a hop object', () => {
      return request.post(`${API_URL}/api/hops`)
        .send({name: 'Magnum', minAA: '10', maxAA: '14', aroma: 'mild, herbal, piney and resinous', use: 'bittering'})
        .then(res => {
          expect(res.status).toEqual(201);
          expect(res.body._id).toExist();
          expect(res.body.timeStamp).toExist();
          expect(res.body.name).toEqual('Magnum');
          expect(res.body.minAA).toEqual(10);
          expect(res.body.maxAA).toEqual(14);
          expect(res.body.aroma).toEqual('mild, herbal, piney and resinous');
          expect(res.body.use).toEqual('bittering');
          tempHop = res.body;
        });
    });
    it('should respond with a 400 status code if no body is sent.', () => {
      return request.post(`${API_URL}/api/hops`)
        .send(null)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with a 409 status code if a hop object already exists.', () => {
      return request.post(`${API_URL}/api/hops`)
        .send(tempHop)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });
  describe('testing GET /api/hops', () => {
    it('should respond with a 200 status code and a hop object.', () => {
      return request.get(`${API_URL}/api/hops/${tempHop._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.timeStamp).toExist();
          expect(res.body.name).toEqual('Magnum');
          expect(res.body.minAA).toEqual(10);
          expect(res.body.maxAA).toEqual(14);
          expect(res.body.aroma).toEqual('mild, herbal, piney and resinous');
          expect(res.body.use).toEqual('bittering');
        });
    });
    it('should respond with a 200 status code and an array of IDs for all hop objects present in the DB.', () => {
      return request.get(`${API_URL}/api/hops`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(Array.isArray(res.body)).toEqual(true);
        })
        .catch(err => {
          expect(err.status).toEqual(404);
        });
    });
    it('should respond with a 404 status code and not return a hop object.', () => {
      return request.get(`${API_URL}/api/hops/12345`)
        .catch(res => {
          expect(res.status).toEqual(404);
          expect(res.body).toEqual(null);
        });
    });
  });

  describe('testing PUT /api/hops', () => {
    it('should respond with a 202 status code and an updated hop object.', () => {
      return request.put(`${API_URL}/api/hops/${tempHop._id}`)
        .send({minAA: '11', aroma: 'herbal, piney and resinous'})
        .then(res => {
          expect(res.status).toEqual(202);
          expect(res.body.minAA).toEqual(11);
          expect(res.body.aroma).toEqual('herbal, piney and resinous');
        });
    });
    it('should respond with a 400 status code and a hop with name \'Magnum\'.', () => {
      return request.put(`${API_URL}/api/hops/${tempHop._id}`)
        .send(null)
        .then(res => {
          expect(res.body.name).toEqual('Magnum');
        })
        .catch(err => {
          expect(err.status).toEqual(400);
        });
    });
    it('should respond with a 404 error code if an ID is not found.', () => {
      return request.get(`${API_URL}/api/hops/12345`)
        .catch(err => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE /api/hops', () => {
    it('should respond with a 404 status code and not delete anything', () => {
      return request.delete(`${API_URL}/api/hops/12345`)
        .catch(res => {
          expect(res.status).toEqual(404);
          return request.get(`${API_URL}/api/hops/${tempHop._id}`)
            .then(res => {
              expect(res.body).toExist();
            });
        });
    });
    it('should respond with a 204 status code and delete the given hop object', () => {
      return request.delete(`${API_URL}/api/hops/${tempHop._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
          return request.get(`${API_URL}/api/hops/${tempHop._id}`)
            .then(res => {
              expect(res.body).toNotExist();
            });
        });
    });
  });
});
