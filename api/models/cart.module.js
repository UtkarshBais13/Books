const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // or mongoose.Schema.Types.ObjectId if you're linking to a User collection
    required: true,
    unique: true, // Ensure each user has one cart
  },
  items: [
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        author:{
            type:String,
            required:true,
            unique:false
        },
        photo:{
            type:String,
            required:false
    
        },
        price:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            required:true,
            unique:true
        },
        category:{
            type:String,
            default:""
           
        },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
