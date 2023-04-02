const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        data: Buffer,
        contentType: String
      },
      category:{
        type: String,
        required: true
      },
      catalogNum:{
        type:String,
        required:true
      },
      stock:{
        type:Number,
        required:true
      }
});

const Item = mongoose.model('Item',ItemSchema);
module.exports = Item;