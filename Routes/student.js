import Express from "express";
import {db} from "../CloudDb/mongoCloudDb.js"
import bcrypt from "bcrypt";
import { transport,mailOptions } from "../MailUtils/mail-utils.js";

const studentRouter=Express.Router();

const studentCollection=db.collection("students");

//api to add student and teacher data in this same api mail will be trigged
studentRouter.post('/',async(req,res)=>{
try{
    // const data={
    //     ...req.body,
    //     studentId:Date.now().toString()
    // }

    // const student=new studentModel(data);
    // await student.save();
    let data;
    bcrypt.hash(req.body.password,10,async(err,hashData)=>{
        if(err){
            res.status(500).send({message:"Internal server error",e})
        }else{
           data={
                ...req.body,
                password:hashData
            };
            await studentCollection.insertOne(data);
            transport.sendMail({
                ...mailOptions,
                to:[req.body.email],
            })
            res.send({message:"Data added successful"});
        }
    })    
}catch(e){
    res.send({message:"Internal server error",e});
}
}) 

//api to get all the student data
studentRouter.get("/",async(req,res)=>{
    try{
    const data=await studentCollection.find({role:"Student"},{projection:{_id:0,password:0}}).toArray(); 
    res.send({data});
    }catch(e){
        res.status(500).send({message:"Internal server error"});
    }

})

//api to get all the teacher data
studentRouter.get("/teacher",async(req,res)=>{
    try{
        const data=await studentCollection.find({role:"Teacher"},{projection:{_id:0,password:0}}).toArray();
        res.send({data});
    }catch(e){
        res.status(500).send({message:"Internal server error"});
    }
})

export default studentRouter;