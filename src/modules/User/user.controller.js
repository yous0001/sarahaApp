import User from "../../../DB/MODELS/user.model.js"
import bcrypt from "bcryptjs"


//====================================signup=======================================================================//
export const SignUpapi=async(req,res,next)=>{
    const {username,email,password} =req.body
    //check duplication in username
    const isusernameDuplicate =await User.findOne({username})
    if(isusernameDuplicate){
        return res.status(409).json({
            message:"username is already exists",
            status:409
        })
    }
    //check duplication in email
    const isEmailDuplicate =await User.findOne({email})
    if(isEmailDuplicate){
        return res.status(409).json({
            message:"email is already exists",
            status:409
        })
    }
    //hashing the password with level 10 
    const hashpassword=bcrypt.hashSync(password,parseInt(process.env.saltround))
    //create user
    const createUser =await User.create({username,email,password:hashpassword})
    if(!createUser){ //check failure in creation
        return res.status(500).json({
            message:"user registeration failed",
            status:500
        })
    }
    return res.status(201).json({
        message:"user registeration success",
        status:201,
        createUser
    })
} 
//===========================================================================================================//


//====================================================signin=======================================================//
export const signin=async(req,res,next)=>{
    const {username,email,password} = req.body
    const user= await User.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    
    if(!user){
        return res.status(404).json({
            message:"invalid login data",
            status:404
        })
    }

    const isPasswordCorrect= await bcrypt.compare(password,user.password)//compare input password with userpassword(encrypted)
    if(!isPasswordCorrect){
        return res.status(404).json({
            message:"invalid login data",
            status:404
        })
    }
    return res.status(200).json({
        message:"login success",
        status:200
    })
}
//===========================================================================================================//



//=============================================updateAccount==============================================================//

export const updateAccount=async (req,res,next)=>{
    const {username,email} =req.body
    const {_id,loggedInID} =req.query
    if(_id!==loggedInID){
        return res.status(401).json({
            message:"Unauthorized update",
            status:401
        })
    }
    let updateobject ={}
    if(username){
    const isusernameDuplicate =await User.findOne({username})
    if(isusernameDuplicate){
        return res.status(409).json({
            message:"username is already exists",
            status:409
        })
    }
    updateobject.username=username;
}
    if(email){
        const isEmailDuplicate =await User.findOne({email})
        if(isEmailDuplicate){
            return res.status(409).json({
                message:"email is already exists",
                status:409
            })
        }
        updateobject.email=email;
    }
    const updateUser=await User.updateOne({_id},updateobject);
    if(!updateUser.modifiedCount){
        return res.status(404).json({
            message:"invalid UserID",
            status:404
        })
    }
    return res.status(200).json({
        message:"Updated success",
        status:200
    })
}

//===========================================================================================================//


//================================================deleteUser===========================================================//

export const deleteUser=async(req,res,next)=>{
    const {_id,loggedInID}=req.query
    if(_id!==loggedInID){
        return res.status(401).json({
            message:"Unauthorized Delete",
            status:401
        })
    }
    const user =await User.findByIdAndDelete(_id)
        if(!user){
        return res.status(404).json({
            message:"invalid ID",
            status:404
        })
    }

    return res.status(200).json({
        message:"deleted success",
        status:200
    })

}

//===========================================================================================================//
//==================================================getUserData=========================================================//

export const getuserdata=async(req,res,next)=>{
    const {_id}=req.params
    const user =await User.findById(_id,'username')
    if(!user){
        return res.status(404).json({
            message:"invalid userID",
            status:400
        })
    }
    return res.status(200).json({
        message:"done",
        status:200,
        user
    })

}

//===========================================================================================================//