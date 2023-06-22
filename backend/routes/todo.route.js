const {Router}=require('express')
const { authentication } = require('../middleware/authentication')
const { TodoModel } = require('../models/todo.model')
require('dotenv').config()

const todoRoute=Router()

todoRoute.post("/create",authentication,async(req,res)=>{
    const {todo}=req.body;
    try {
        const time=Date.now()
        const data=new TodoModel({todo,time})
        await data.save()
        res.send({"success":"Todo Added"})
    } catch (error) {
        res.send({"error":"Todo not Added"})
        
    }
})

todoRoute.get("/read",authentication,async(req,res)=>{
    
    try {
        const data=await TodoModel.find()
        res.send(data)
    
    } catch (error) {
        res.send({"error":"Some thing wrong"})
        
    }
})

todoRoute.put("/read/:id",authentication,async(req,res)=>{
    const {todo}=req.body
    const {id}=req.params
    try {
        await TodoModel.findOneAndUpdate({_id:id},{todo:todo})
        res.send({"success":"Data Updated"})
    
    } catch (error) {
        res.send({"error":"Some thing wrong"})
        
    }
})

todoRoute.delete("/read/:id",authentication,async(req,res)=>{
    const {todo}=req.body
    const {id}=req.params
    try {
        await TodoModel.deleteOne({_id:id})
        res.send({"succes":"Todo deleted"})
    
    } catch (error) {
        res.send({"error":"Some thing wrong"})
        
    }
})
module.exports={todoRoute}