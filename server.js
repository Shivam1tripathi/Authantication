import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import authRoutes from './Routes/authRoutes.js';
import cors from 'cors';
import Dbconnection from './config/db.js';



const app=express();
dotenv.config()
//db
Dbconnection();

const port=8080;

//middelwares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

app.get("/",(req,res)=>{
res.send({
    message:"Welcome to the Auth"
})
})

app.use("/api/v2/auth",authRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${process.env.Dv_mode} ${port}`)
})

