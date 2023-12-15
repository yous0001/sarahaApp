import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        reqired:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        reqired:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        reqired:true
    },
    isconformed:{
        type:Boolean,
        default:false
    },
    profilepicture:String
},{
    timestamps:true
})

const User = model('User',userSchema)
export default User