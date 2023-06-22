const {Router}=require('express')
const { UserModel } = require('../models/user.model')
const bcrypt=require('bcrypt')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const userRoute=Router()


userRoute.post('/signup',async(req,res)=>{
    const {email,password,mobile}=req.body
    const isExist=await UserModel.findOne({email})
    if(isExist){
        res.send({'err':"User already exist"})
    }
    else{
       bcrypt.hash(password,4,async(err,hashed)=>{
        if(!err){
            try {
                const data=new UserModel({
                    email,
                    password:hashed,
                    mobile
                })
                await data.save()
                res.send({'success':"Signup success"})
            } catch (error) {
                console.log(error)
                res.send({'error':"Signup failed"})
                
            }
        }
       })
    }
})

userRoute.post('/login',async(req,res)=>{
    const {email,password,mobile}=req.body
   const user=await UserModel.findOne({email})
   const existmobile=await UserModel.findOne({mobile})
   if(user||existmobile){
        let hashed=user.password
       bcrypt.compare(password,hashed,(err,result)=>{
        if(result){
            const token=jwt.sign({email},process.env.SECRET)
            res.send({"token":token})
        }
       })
   }
    
})
module.exports={userRoute}