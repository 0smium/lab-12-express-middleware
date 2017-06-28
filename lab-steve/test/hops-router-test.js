'use strict';

// require('dotenv').config({path: './test/.env'});
require('dotenv').config({path: './.env'});
const request = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempHop;

describe('testing hop routes', () => {
  // before(server.start);
  // after(server.stop);

  describe('testing POST /api/hops', () => {
    it('should respond with a 200 status code and a hop object', () => {
      return request.post(`${API_URL}/api/hops`)
        .send({name: 'Magnum', minAA: '10', maxAA: '14', aroma: 'mild, herbal, piney and resinous', use: 'bittering'})
        .then(res => {
          expect(res.status).toEqual(201);
          expect(res.body._id).toExist();
          expect(res.body.timeStamp).toExist();
          expect(res.body.name).toEqual('Magnum');
          expect(res.body.minAA).toEqual('10');
          expect(res.body.maxAA).toEqual('14');
          expect(res.body.aroma).toEqual('mild, herbal, piney and resinous');
          expect(res.body.use).toEqual('bittering');
          tempHop = res.body;
        });
    });
    // it('should respond with a 400 sattus code if no body is sent.', () => {
    //   return request.post(`${API_URL}/api/hops`)
    //     .send(null)
    //     .catch(res => {
    //       expect(res.status).toEqual(400);
    //     });
    // });
  });
});
