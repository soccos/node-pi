const mongoose = require('mongoose');
const colors = require('colors');
const secret = require('./secret');
const {mongodb} = secret;

mongoose.Promise = Promise;


module.exports = mongoose;