const mongoose = require('mongoose');
const {ItemSchema} = require('./item')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  cart: {
    type: [ItemSchema],
    default: []
  },
  total:{
    type:Number,
    default:0
  }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
