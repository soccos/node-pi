const {uploadDir} = require('./secret');
module.exports = {
  koaBodySetting: {
    multipart: true,
    formidable: {
      maxFields: 20,
      uploadDir,
      hash: 'md5',
      keepExtensions: true
    }
  }
};