const mongoose = require('../settings/mongodb');
const Schema = mongoose.Schema;
const emailCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
    index: 1
  },
  email: {
    type: 'String',
    trim: true,
    validate: [function(email) {
      const reg = /[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+/;
      return reg.test(email);
    }, '邮箱格式不正确']
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
  toc: {
    type: Date,
    default: Date.now,
    index: 1
  }
}, {
  collection: 'emailsCodes'
});
const EmailCodeModel = mongoose.model('emailsCode', emailCodeSchema);
module.exports = EmailCodeModel;