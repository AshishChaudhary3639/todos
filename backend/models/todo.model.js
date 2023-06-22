const mongoose=require('mongoose')
const todoSchema=mongoose.Schema({
    todo:{type:String},
    time:Date
})

const TodoModel=mongoose.model('todo-list',todoSchema)

module.exports={TodoModel}