const mongoose = require('mongoose');
const colors = require('colors');
const secret = require('./secret');
const {mongodb} = secret;

mongoose.Promise = Promise;
mongoose.connect(mongodb, {})
  .then(() => {
    console.log('database connected...'.green)
  })
  .catch(e => {
    console.error(e.stack.red)
  });

module.exports = mongoose;