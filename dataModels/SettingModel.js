const mongoose = require('mongoose');
const {Schema} = mongoose;
const settingSchema = new Schema({
  type: {
    type: String,
    enum: ['cookie', 'page', 'email', 'upload', 'server', 'cache'],
    required: true,
    index: 1
  },

  // --cookie--
  maxAge: Number,
  signed: Boolean,
  key: String,

  // --page--
  articleListPerPage: Number,
  commentListPerPage: Number,

  // --email--
  expiryDate: Number,
  host: String,
  port: Number,
  user: String,
  pass: String,

  // --upload--
  uploadDir: String,
  multipart: Boolean,
  maxFields: Number,
  hash: String,
  keepExtensions: Boolean,
  /*
  * koaBodySetting={
  *   multipart,
  *   formidable: {
  *     maxFields,
  *     uploadDir,
  *     hash,
  *     keepExtensions
  *   }
  * }
  *
  *
  * */

  //-- server --
  name: String,
  github: String,
  //port: Number,
  address: String,

  //-- cache --
  staticServe: Number,
  favicon: Number,
  resource: Number

}, {
  collection: 'settings'
});

const SettingModel = mongoose.model('settings', settingSchema);
module.exports = SettingModel;