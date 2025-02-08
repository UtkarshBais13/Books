const mongoose = require("mongoose");
const URI = process.env.MONGO_URL;

const connectDb = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("connection to db succefull");
        
    } catch (error) {
        console.log(error);
        process.exit(0)
        
    }
}
module.exports = connectDb;