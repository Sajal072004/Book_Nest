import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    }
})

const User=mongoose.model('User',UserSchema);

export default User;