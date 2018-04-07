const mongoose = require('../settings/mongodb');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  _id: Number,
  username: {
    type: String,
    required: true,
    index: 1
  },
  password: {
    type: String,
    required: true,
    index: 1
  }
},{
  collection: 'users'
});
const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
