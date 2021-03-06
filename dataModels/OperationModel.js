const mongoose = require('mongoose');
const {Schema} = mongoose;
const operationSchema = new Schema({
  _id: String,
  description: {
    type: String,
    required: true
  },
  toc: {
    type: Date,
    default: Date.now,
    index: 1
  },
  tlm: {
    type: Date,
    set: function(){
      if(this.toc) {
        return this.toc;
      } else {
        return Date.now();
      }
    },
    index: 1
  }
}, {
  collection: 'operations'
});
const OperationModel = mongoose.model('operations', operationSchema);
module.exports = OperationModel;