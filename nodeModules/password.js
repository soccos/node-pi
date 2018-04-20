const {getRandomString} = require('./string');
const crypto = require('crypto');
const fn = {};
fn.getPasswordObj = (passwordStr, salt) => {
  const numberReg = /[0-9]/;
  const lowercaseReg = /[a-z]/;
  const upperCaseReg = /[A-Z]/;
  if(passwordStr.length < 8) {
    throw throwErr(400, '密码不能小于8个字符');
  }
  if(!numberReg.test(passwordStr) && lowercaseReg.test(passwordStr) && upperCaseReg.test(passwordStr)) {
    throw throwErr(400, '密码必须含有数字、小写字母和大写字母');
  }
  if(!salt) {
    salt = getRandomString(8);
  }
  const hmac = crypto.createHmac('sha256', salt);
  hmac.update(passwordStr);
  const hash = hmac.digest('hex');
  return {
    salt,
    hash
  }
};
fn.ensurePassword = (passwordStr, passwordObj) => {
  const password2 = fn.getPasswordObj(passwordStr, passwordObj.salt);
  return (password2.hash === passwordObj.hash);
};
module.exports = fn;