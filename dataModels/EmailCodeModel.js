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
    validate: {
      validator: function(v) {
        return /[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+/.test(v);
      },
      message: '邮箱格式不正确'
    },
  },
  password: {
    salt: {
      type: String
    },
    hash: {
      type: String
    },
  },
  toc: {
    type: Date,
    default: Date.now,
    index: 1
  },
  used: {
    type: Boolean,
    default: false,
    index: 1
  }
}, {
  collection: 'emailCodes'
});

emailCodeSchema.statics.ensureEmailCode = async (options) => {
  const SettingModel = require('./SettingModel');
  const EmailCodeModel = mongoose.model('emailCodes');
  const emailSettings = await SettingModel.findOne({_id: 'email'});
  if(!emailSettings) throwErr(500, 'not found email settings');
  const {expiryDate} = emailSettings;
  const {code, email, type} = options;
  const emailCode = await EmailCodeModel.findOne({code, email, type});
  if(!emailCode || emailCode.used) throwErr(400, '邮件已失效');
  if(emailCode.toc < (Date.now() - expiryDate)) throwErr(400, '邮件已过期');
  return emailCode;
};

emailCodeSchema.statics.ensureSendPermission = async (options) => {
  const SettingModel = require('./SettingModel');
  const EmailCodeModel = mongoose.model('emailCodes');
  const emailSettings = await SettingModel.findOne({_id: 'email'});
  if(!emailSettings) throwErr(500, 'not found email settings');
  const {oneDayCount} = emailSettings;
  const {email, type} = options;
  const emailCodes = await EmailCodeModel.find({email, type, toc: {$gt: Date.now()-24*60*60*1000}});
  if(emailCodes.length >= oneDayCount) throwErr(400, `24小时内同一邮箱最多只能发送${oneDayCount}封邮件`);
};

const EmailCodeModel = mongoose.model('emailCodes', emailCodeSchema);
module.exports = EmailCodeModel;