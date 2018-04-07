const mongoose = require('../settings/mongodb');
const Schema = mongoose.Schema;
const documentSchema = new Schema({
  _id: Number,
  title: {
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  toc: {
    type: Date,
    default: Date.now,
    index: 1
  },
  tlm: {
    type: Date,
    index: 1
  },
  cids: {
    type: [Number],
    required: true,
    index: 1
  },
  visit: {
    type: Number,
    default: 0,
    index: 1
  },
  thumbUp: {
    type: Number,
    default: 0,
    index: 1
  },
  disabled: {
    type: Boolean,
    default: false,
    index: 1
  },
  cover: {
    type: String,
    required: true
  }
}, {
  collection: 'documents'
});

documentSchema.virtual('forums')
  .get(function() {
    return this._forums
  })
  .set(function(forums) {
    this._forums = forums;
  });

documentSchema.pre('save', function(next) {
  if(!this.tlm) {
    this.tlm = this.toc;
  }
  next();
});

documentSchema.statics.getAsideArticles = async function() {
  const DocumentModel = mongoose.model('documents');
  const q = {
    disabled: false
  };
  const thumbUpArticles = await DocumentModel.find(q).sort({thumbUp: -1}).limit(10);
  const visitArticles = await DocumentModel.find(q).sort({visit: -1}).limit(10);
  const articles = await DocumentModel.find(q, {_id: 1});
  const arr = [];
  let length = await DocumentModel.count({disabled: false});
  if(length > 10) {
    length = 10;
  }
  for(let i = 0; i >=0; i++) {
    const random = Math.floor(Math.random()*articles.length);
    if(!arr.includes(articles[random]._id)) arr.push(articles[random]._id);
    if(arr.length === length) break;
  }
  const randomArticles = [];
  for(let _id of arr) {
    const article = await DocumentModel.findOne({_id});
    randomArticles.push(article);
  }
  return {
    thumbUpArticles,
    visitArticles,
    randomArticles
  }
};
documentSchema.methods.extendForums = async function() {
  const ForumModel = require('./ForumModel');
  const forums = [];
  if(this.cids.length !== 0) {
    for(let cid of this.cids) {
      const forum = await ForumModel.findOne({_id: cid});
      if(forum) {
        forums.push(forum);
      }
    }
  }
  return this.forums = forums;
};
const DocumentModel = mongoose.model('documents', documentSchema);
module.exports = DocumentModel;