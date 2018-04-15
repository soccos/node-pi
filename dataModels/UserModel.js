const mongoose = require('../settings/mongodb');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  _id: Number,
  username: {
    type: String,
    unique: true,
    trim: true
  },
  usernameLowercase: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  roles: {
    type: [Number],
    default: [],
    index: 1
  },
  commentCount: {
    type: Number,
    default: 0,
    index: 1
  },
  articleCount: {
    type: Number,
    default: 0,
    index: 1
  },
  description: {
    type: String,
    default: null,
    maxlength: [128, '个人简介不能超过128个字']
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
  tlv: {
    type: Date,
    index: 1
  }
},{
  collection: 'users'
});
userSchema.pre('save', function(next) {
  if(!this.tlm) {
    this.tlm = this.toc;
  }
  if(!this.tlv) {
    this.tlv = this.toc;
  }
  next();
});
userSchema.pre('update', function(next) {
  this.tlm = Date.now();
  next();
});


const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
