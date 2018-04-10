const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: String,
  age: Number
});
const TestModel = mongoose.model('tests', schema);
module.exports = TestModel;
