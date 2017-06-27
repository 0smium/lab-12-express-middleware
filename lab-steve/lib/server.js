'use strict';

//NPM Modules
const express = require('express');
const mongoose = require('mongoose');

//configure Mongoose
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log('Unable to connect. Start mongod first. Error:', err);
  } else {
    console.log('Connected to Mongo database');
  }
});

//instantiate server and app
let server;
const app = express();

//tell app to use ../route/<router>.js
app.use(require('../route/<router>.js'));

//export server and server controls
const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('server down');
      server.isOn = false;
      resolve();
    });
  });
};
