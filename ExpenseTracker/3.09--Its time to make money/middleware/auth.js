const jwt=require('jsonwebtoken');
const authenticationToken=(req,res,next)=>{
    const token=req.header('Authorization');
    //console.log(token);
    if(!token){
        res.status(404).json({Error:'Token doesnot exists'});
    }

    try {
        const decode=jwt.verify(token,'secret@key');
       // console.log(decode);
        req.user=decode;
        next();
    } catch (error) {
        res.send(400).json({Error:'Invalid token'});
    }
}

module.exports=authenticationToken;