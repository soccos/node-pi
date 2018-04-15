const fn = {};
const mongoose = require('../settings/mongodb');

fn.getNewId = async (databaseName) =>{
  const model = mongoose.model(databaseName);
  const data = await model.findOne().sort({_id: -1});
  if(data) {
    return data._id + 1;
  } else {
    return 1;
  }
};

module.exports = fn;