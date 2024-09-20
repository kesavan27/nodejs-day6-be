import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import {db} from "../CloudDb/mongoCloudDb.js";


const authRouter=express.Router();

const studentCollection=db.collection("students");

//login api to check weather the student ot teacher exist in the data base if exist it will generate a token
authRouter.post("/",async(req,res)=>{
    try{
       const data=await studentCollection.findOne({email:req.body.email},{projection:{_id:0}});
       if(data!=null){
        bcrypt.compare(req.body.password,data.password,(err,result)=>{
            if(result){
                const token=jwt.sign(data,process.env.JWT_SECRET_KEY,{
                    expiresIn:process.env.EXPIRY_TIME
                });
                res.send({token});
            }else{
                res.send({message:"Login failed Incorrect password",err});
            }
        })
       }
    }catch(e){
        res.status(500).send({message:"Internal server error",e});
    }
})

//api to verify the token 
authRouter.post("/verifytoken",(req,res)=>{
    console.log(req.body);
    try{
    jwt.verify(req.body.token,process.env.JWT_SECRET_KEY,(err,result)=>{
        if(err){
            res.send({message:"Internal server error",err})
        }else{
            res.send({result});
        }
    })
}catch(e){
    req.status(500).send({message:"Internal server error",e})
}
})

export default authRouter;