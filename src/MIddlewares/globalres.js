//send json res insted of html 

export const globalres=(err,req,res,next)=>{
    if(err){
        return res.status(500).json({
            message:"catch error",
            errMsg:err.message,
            errLocation:err.stack

        })
    }
}