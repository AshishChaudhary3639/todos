const jwt=require('jsonwebtoken')
const { UserModel } = require('../models/user.model')
require('dotenv').config()
const authentication=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1]
    if(token){
        jwt.verify(token,process.env.SECRET,async(err,decode)=>{
            if(!err){
                let email=decode.email
                const user=await UserModel.findOne({email})
                
                next()
            }
        })
    }
}

module.exports={authentication}