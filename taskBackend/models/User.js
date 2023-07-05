const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        enum:["User" , "Admin"],
        required:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    task:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }],


})

module.exports = mongoose.model("User" ,userSchema);