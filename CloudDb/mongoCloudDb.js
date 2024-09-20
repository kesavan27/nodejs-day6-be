import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const dbName=process.env.DB_NAME;
const password=process.env.DB_PASSWORD;
const userName=process.env.DB_USER;
const cluster=process.env.DB_CLUSTER;

const cloudUrl=`mongodb+srv://${userName}:${password}@${cluster}/?retryWrites=true&w=majority&appName=Cluster0`;

const client=new MongoClient(cloudUrl);

const db=client.db(dbName);

async function mongoDbConnection() {
    try{
        await client.connect();
        console.log("Mongodb connection successful");
    }catch(e){
        console.log("Mongodb connection failed"+e);
        process.exit(1);
    }
}

export{db,client};
export default mongoDbConnection;