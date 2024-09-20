import Express from "express";
import mongoDbConnection from "./CloudDb/mongoCloudDb.js";
import studentRouter from "./Routes/student.js";
import authRouter from "./Routes/authenticate.js";
import dotenv from "dotenv";
import cors from "cors";

//middle ware to config the env file 
dotenv.config();
const server=Express();

server.use(cors());
server.use(Express.json());

//connecting mongodb 
await mongoDbConnection();
// //connecting mongoose
// await connectionMongoose();

//Using student router
server.use("/student",studentRouter);
//using authentication router for login and token generation
server.use("/authenticate",authRouter);

const port=8000;
 server.listen(port,()=>{
    console.log("Listerning port: "+port)
 })