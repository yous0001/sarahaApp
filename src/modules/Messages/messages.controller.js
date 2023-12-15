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
        return res.state(400).json({
            message:"creation failed"
        })
    }
    return res.state(201).json({
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

