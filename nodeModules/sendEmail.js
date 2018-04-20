const nodemailer = require('nodemailer');
module.exports = async (mailOptions) => {
  const SettingModel = require('../dataModels/SettingModel');
  const emailSettings = await SettingModel.findOne({_id: 'email'});
  if(!emailSettings) throwErr(500, 'not found email settings');
  const {host, port, user, pass} = emailSettings;
  const email = {
    host,
    port,
    auth: {
      user,
      pass
    }
  };
  const transporter = nodemailer.createTransport(email);
  mailOptions.from = 'pengxiguaa@163.com';
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  })
};