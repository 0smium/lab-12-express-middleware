'use strict';

const mongoose = require('mongoose');

//define schema
const hopSchema = mongoose.Schema({
  name: {type:String, required: true, unique: true},
  // name: {type:String, required: true},
  minAA: {type:Number, required: true},
  maxAA: {type:Number, required: true},
  aroma: {type:String, required: true},
  use: {type:String, required: true},
  timeStamp: {type:Date, default: Date.now()},
});

//export a model
module.exports = mongoose.model('hop', hopSchema);
