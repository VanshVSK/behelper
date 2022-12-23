const router=require('express').Router()
const fund=require('../models/fund')
const varifyuser=require('../middleweres/middlewere')
const axios=require("axios")

//create messages

router.post('/newfund',varifyuser,async (req,res)=>{
  
    const data={
        "file":req.body.file,
        "cloud_name":process.env.CLOUD_NAME,
        "upload_preset":process.env.UPLOAD_PRESET,
        "folder":"Behelpful"
      }
      console.log(data)
      try{  
      const resp = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,data);  
       console.log(resp)
      if(resp.status===200){

const mes= new fund({
    heading:req.body.heading,
    picture:resp.data.secure_url,
    name:req.body.name ,
    fund:req.body.fund,
    upiid:req.body.upiid
});
const m=await mes.save()
res.status(200).json({"success":true,"message":m})
}
else{
    res.status(400).json({"success":false,"message":"some error occured"})
}
}catch(e){
    res.status(400).json({"success":false,"message":"some error occured","error":e})
}}
)

//get messages of user

router.post('/getfund',varifyuser,async (req,res)=>{
    try{  

        const m=await message.find({_id:req.body.id})
         res.status(200).json({"success":true,"message":m})

}catch(e){
    res.status(400).json({"success":false,"message":"some error occured","error":e.message})
}}
)
module.exports = router;