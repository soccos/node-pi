const secret = require('./secret');
module.exports = {
  maxAge: 7*24*60*60*1000,
  signed: true,
  key: secret.cookie
};