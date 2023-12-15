import { Schema, model } from "mongoose";



const messageschema = new Schema({
    content:{
        type:String,
        required:true
    },
    sendTo:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    isviewed:{
        type:Boolean,
        default:false
    }
},{
timestamps:true
})

const Messages =model('Message',messageschema)
export default Messages