const mongoose = require('mongoose');
const {Schema} = mongoose;
const roleSchema = new Schema({
  _id: String,
  description: {
    type: String,
    required: true
  },
  operations: {
    type: [String],
    default: [],
    index: 1
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
  collection: 'roles'
});
const RoleModel = mongoose.model('roles', roleSchema);
module.exports = RoleModel;