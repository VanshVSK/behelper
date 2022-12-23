const jwt=require('jsonwebtoken')

const varifyuser=async(req,res,next)=>{
    const cookie=req.cookies.pas;
    if(!cookie){
        return  res.status(200).json({"success":false,"message":"token not provided"})
    }
    const isvarify=await jwt.verify(String(cookie),process.env.SECRET_KEY,(err,user)=>{
        if(err){
            res.status(200).json({"success":false,"message":"invalid token provided"})
        }
        req.id=user._id;
        next()
    }
    
    )
}
module.exports= varifyuser;