const mongoose = require('../settings/mongodb');
const Schema = mongoose.Schema;
const resourceSchema = new Schema({
  _id: Number,
  toc: {
    type: Date,
    default: Date.now,
    index: 1
  },
  path: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
},{
  collection: 'resources'
});

const ResourceModel = mongoose.model('resources', resourceSchema);
module.exports = ResourceModel;