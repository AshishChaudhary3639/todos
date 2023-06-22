const express=require('express')
const { connection } = require('./config/db')
const { userRoute } = require('./routes/user.route')
const { todoRoute } = require('./routes/todo.route')
const cors=require('cors')
require('dotenv').config()

const app=express()
app.use(express.json())
app.use(cors())
app.use('/',userRoute)
app.use('/',todoRoute)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log('DB Connected')
    } catch (error) {
        console.log('DB not Connected')
        console.log(error)
        
    }
})