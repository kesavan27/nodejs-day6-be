import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbName=process.env.DB_NAME;
const userName=process.env.DB_USER;
const password=process.env.DB_PASSWORD;
const cluster=process.env.DB_CLUSTER;

const cloudUrl=`mongodb+srv://${userName}:${password}@${cluster}/${dbName}/?retryWrites=true&w=majority&appName=Cluster0`;

const connectionMongoose=async()=>{
    try{
        await mongoose.connect(cloudUrl);
        console.log("Mongoose Connection successful");
    }catch(e){
        console.log("Mongoose Connection failed"+e);
        process.exit(1);
    }
}

export default connectionMongoose;