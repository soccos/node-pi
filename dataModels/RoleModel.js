const mongoose = require('mongoose');
const {Schema} = mongoose;
const roleSchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  permission: {
    type: [Number],
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