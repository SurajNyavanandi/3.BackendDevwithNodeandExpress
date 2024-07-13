const SignUp=require('../models/index');

exports.createUserSignUp=async (req,res)=>{
    try {
       const user=await SignUp.create(req.body);
       res.status(201).json(user); 
    } catch (error) {
       res.status(500).send({Error:'Creating sign up details'}); 
    }
}