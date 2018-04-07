const mongoose = require('../settings/mongodb');
const Schema = mongoose.Schema;
const forumSchema = new Schema({
  _id: Number,
  displayName: {
    type: String,
    unique: true,
    required: true
  },
  color: {
    type: String,
    required: true,
    unique: true
  },
  toc: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  count: {
    type: Number,
    default: 0
  }
}, {
  collection: 'forums'
});

const ForumModel = mongoose.model('forums', forumSchema);
module.exports = ForumModel;