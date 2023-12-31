import express  from "express";
import userrouter from "./src/modules/User/user.routes.js";
import msgrouter from "./src/modules/Messages/messages.routes.js";
import db_connection from "./DB/conection.js";
import { config } from "dotenv";
import { globalres } from "./src/MIddlewares/globalres.js";

config({path:"./config/.env"})

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use("/user",userrouter)
app.use("/msg",msgrouter)
app.use(globalres)

app.use('*',(req,res,next)=>{
    res.send('<h1>invalid api</h1>')
})

db_connection();
app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`);
})