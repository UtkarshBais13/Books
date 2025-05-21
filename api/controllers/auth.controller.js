//Home page logic
const User = require("../models/user-model")
const bcrypt = require("bcryptjs")
const home = async(req,res)=>{
    try {
        res
        .status(200)
        .send(
            "welcome to home"
        )

    } catch (error) {
        console.log(error);
        
    }
}
const register = async(req,res)=>{
    try {
       // console.log(req.body);
         const {username,email,password} = req.body;
         const userExsist = await User.findOne({email});
         if(userExsist){
            return res.status(400).json({msg:"email already exists"});

         }
        //  const salt = 10;
        //   const hashedpass = await bcrypt.hash(password,salt);
         const userCreated =  await User.create({username,email,password});

         return res.status(201).json({
            msg:"user created sucess",
            
            token:await userCreated.generateToken(),
             userId:userCreated._id.toString(),
        });

        
       

    } catch (error) {
        console.log(error);
        
    }
}
const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const userExsist = await User.findOne({email});
        // console.log(userExsist);
        
        if(!userExsist){
            return res.status(400).json({message:"Invalid credentialsss"});
            
        }
        
       // const user = password==userExsist.password;
       const user = await bcrypt.compare(password,userExsist.password)
       

        if(user){
            res.status(200).json({
                msg:"Login successful",
                token: await userExsist.generateToken(),
                userId : userExsist._id.toString(),
            });
        
            
        }
            else{
                res.status(401).json({message:"Invalid Credinatials"})
                //res.status(500).json({message:userExsist.password})
                
            }
        

    } catch (error) {
        console.log(error,"error in login");
        
    }

}
module.exports = {home,register,login};