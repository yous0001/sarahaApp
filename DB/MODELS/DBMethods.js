

export const findDocument =async (model,query)=>{
    const isDcocumentexists = await model.findOne(query)
    return (isDcocumentexists)?{message:"document  found",status:200,success:true}:{message:"document not found",status:404,success:false}
}