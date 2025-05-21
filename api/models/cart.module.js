const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
      userId:{
        type:String,
        required:true,
        unique:false
        
      },
      bookId: {
        type: String,
        required: true,
        unique:false,
       
      },
      title: {
        type: String,
        
        unique:false,
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
      price: {
        type: Number,
        required: true,
        unique:false,

      },
      quantity: {
        type: Number,
        unique:false,
        default: 1,
      },
    }, { timestamps: true });
    
    // Add compound index to prevent duplicate items
    // cartSchema.index({ userId: 1, bookId: 1 }, { unique: true });

module.exports = mongoose.model("Cart", cartSchema);
