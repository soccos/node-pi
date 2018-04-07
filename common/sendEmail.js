const {email} = require('../settings/secret');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(email);
module.exports = async (mailOptions) => {
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