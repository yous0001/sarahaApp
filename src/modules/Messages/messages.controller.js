import User from "../../../DB/MODELS/user.model.js"
import Messages from "../../../DB/MODELS/message.model.js"
import { findDocument } from "../../../DB/MODELS/DBMethods.js"


export const sendMessage = async (req,res,next)=>{
    const {content} = req.body
    const {sendTo} = req.params

    

    //by make general function
    const isUserexists=await findDocument(User,{_id:sendTo})
    if(!isUserexists.success){
        return res.status(isUserexists.status).json(isUserexists.message)
    }
    
    const createdMessage = await Messages.create({content,sendTo})
    if(!createdMessage){
        return res.status(400).json({
            message:"creation failed"
        })
    }
    return res.status(201).json({
        message:"create success"
    })
}



export const deletemesssage=async (req,res,next)=>{
    const{loggedinUserID,messageID}=req.query
    const deletedMessage = await Messages.findOneAndDelete({_id: messageID,sendTo:loggedinUserID})
    if(!deletedMessage){
        return res.status(400).json({
            message:"cannot delete message"
        })
    }
    return res.status(200).json({
        message:"delete message success"
    })
}

export const markmessage=async(req,res,next)=>{
    const{loggedinUserID,messageID}=req.query

    const updatedmessage = await Messages.findOneAndUpdate(
        {_id:messageID,sendTo:loggedinUserID,isviewed:false},
        {isviewed:true , $inc:{__v:1}},
        {new:true}
    )
    if(!updatedmessage){
        return res.status(400).json({
            message:"update failed"
        })
    }
    return res.status(200).json({
        message:"update success",
        updatedmessage
    })
}



export const listUserMessages=async(req,res,next)=>{
    const{loggedinUserID,isviewed}=req.query 

    const messages=await Messages.find({sendTo:loggedinUserID,isviewed}).sort({createdAt:-1})//sort messages desending
    if(!messages){
        return res.status(200).json({
            message:"no messages"
            
        })
    }
    return res.status(200).json({
        message:"your messages"
        ,messages
    })

} 

