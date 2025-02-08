const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
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
       
    }
})
module.exports = mongoose.model("Book",bookSchema);