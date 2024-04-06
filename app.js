import express from 'express';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:String,email:String
});
const User = mongoose.model("User",userSchema);

const app = express();

app.listen(3000,(req,res)=>{
    console.log("server OK!");
    
})

app.

app.get("/user",(req,res)=>{
    res.json({
        user:"data",
        succes:"try again"
    })
})