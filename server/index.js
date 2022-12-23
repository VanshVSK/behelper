const express=require('express')
const mongoose=require('mongoose')
const bp=require('body-parser')
const cors=require('cors')
const dotenv=require('dotenv')
const http=require('http')
const cloudinary=require('cloudinary')
const path=require("path")
const cp=require('cookie-parser')

const messageRoute=require('./routes/fund')
const auth =require('./routes/auth')
const userRoute=require('./routes/user')

const app=express()
const server=http.createServer(app)


dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})  

mongoose.connect(process.env.MONGOURL).then(console.log("connected successfully")).catch((e)=>{console.log(e)})


app.use(cors({ credentials : true,  origin: "http://localhost:3000" }))
app.use(bp.json({limit:'5mb'}))
app.use(bp.urlencoded({limit:'5mb',extended:true}))
app.use(cp())

app.use('/api/user',auth)
app.use('/api/user',messageRoute)
app.use('/api/user',userRoute)


server.listen(process.env.PORT || 8000,()=>{
console.log('server is listening on port 8000 ....')
})