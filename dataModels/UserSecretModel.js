const mongoose = require('../settings/mongodb');
const Schema = mongoose.Schema;
const userSecretSchema = new Schema({
  _id: Number,
  uid: {
    type: String,
    unique: 1,
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
  password: {
    hashType: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    hash: {
      type: String,
      required: true
    },
  },
  mobile: {
    type: Number,
    default: null,
    trim: true,
    index: 1
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+/.test(v);
      },
      message: '邮箱格式不正确'
    },
  }
},{
  collection: 'users'
});
userSecretSchema.pre('save', function(next) {
  if(!this.tlm) {
    this.tlm = this.toc;
  }
  if(!this.tlv) {
    this.tlv = this.toc;
  }
  next();
});
userSecretSchema.pre('update', function(next) {
  this.tlm = Date.now();
  next();
});


const UserSecrets = mongoose.model('userSecrets', userSecretSchema);
module.exports = UserSecrets;
