const mongoose = require('mongoose');
const {Schema} = mongoose;
const permissionSchema = new Schema({
  _id: Number,
  operation: {
    type: String,
    required: true,
    unique: true
  },
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
  collection: 'permissions'
});
const PermissionModel = mongoose.model('permissions', permissionSchema);
module.exports = PermissionModel;