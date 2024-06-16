import User from "../model/user-model.js";
import bcrypt from 'bcrypt'

export const signup=async (req,res)=>{
    try {
        const {fullname,emailId,password}=req.body;
        const user=await User.findOne({emailId});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const SALT=10;
        console.log(password)
        const hashedPassword=await bcrypt.hash(password,SALT);
        console.log("Bsdk" ,hashedPassword);
        const createdUser=new User({
            fullname:fullname,
            emailId:emailId,
            password:hashedPassword
        });
        await createdUser.save();
        return res.status(200).json({message:"User created successfully",user:{
            _id:createdUser._id,
            fullname:createdUser.fullname,
            emailId:createdUser.emailId
        }});
    } catch (error) {
        console.log("Controller error:",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const login=async(req,res)=>{
    try {
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!user || !isMatch){
            return res.status(404).json({message:"User credentials is wrong. username or password is invalid"});

        }
        else {
            return res.status(200).json({
                message:"Login Successfull",
                user:{
                    _id:user._id,
                    fullname:user.fullname,
                    emailId:user.emailId
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}