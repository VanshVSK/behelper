const mongoose = require("mongoose");

const MessageSchema=new mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    fund:{
        type:String,
        required:true
    },
    upiid:{
        type:String,
        required:true
    }
},
{timestamps:true})
module.exports=mongoose.model('message',MessageSchema);