import mongoose from "mongoose";

const db_connection= async()=>{
    await mongoose.connect(process.env.Conection_Url_Local)
    .then((res)=>console.log("db connnected successfully"))
    .catch((err)=>console.log("db connnected failed",err))
    

}
export default db_connection;