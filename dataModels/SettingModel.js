const mongoose = require('mongoose');
const {Schema} = mongoose;
const settingSchema = new Schema({
  type: {
    type: String,
    enum: ['dataId', 'cookie', 'page', 'email', 'upload', 'server', 'cache'],
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
  resource: Number,

  //-- dataId --
  article: Number,
  comment: Number,
  // resource: Number,
  role: Number,
  operation: Number,
  // user: Number,
  forum: Number


}, {
  collection: 'settings'
});

settingSchema.statics.getNewId = async (type, number) => {
  const SettingModel = mongoose.model('settings');
  const dataId = await SettingModel.findOne({type: 'dataId'});
  if(!dataId) throwErr(500, 'data id error');
  const obj = {};
  obj[type] = dataId[type] + number;
  await dataId.update(obj);
  return obj[type];
};

const SettingModel = mongoose.model('settings', settingSchema);
module.exports = SettingModel;