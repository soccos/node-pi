const mongoose = require('../settings/mongodb');
const Schema = mongoose.Schema;
const logSchema = new Schema({
  reqTime:{
    type: Date,
    default: Date.now,
    index: 1
  },
  ip: {
    type: String,
    required: true,
    index: 1
  },
  method: {
    type: String,
    required: true
  },
  params: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
},{
  collection: 'logs'
});

const LogModel = mongoose.model('logs', logSchema);
module.exports = LogModel;