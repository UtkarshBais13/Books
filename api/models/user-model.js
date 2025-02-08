const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
    
})
userSchema.pre("save", async function (next) {
    const user = this;

    // Skip if the password field is not modified
    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds); // Await is necessary here
        const hashedPassword = await bcrypt.hash(user.password, salt); // Await to resolve the promise
        user.password = hashedPassword; // Assign the hashed password to the user object
        next(); // Proceed to the next middleware
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

// json web token
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
            {
                userId:this._id.toString(),
                email:this.email,
            },
            process.env.JWT_KEY,
            {
                expiresIn:"30d"
            }
        )
    } catch (error) {
        console.log(error);
        
    }
} 

 
const User = new mongoose.model("User",userSchema);
module.exports = User;