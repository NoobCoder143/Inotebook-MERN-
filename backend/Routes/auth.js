const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../Middleware/fetchuser');
const JWT_Secret ="secret";

//Create a user using:Post "/api/auth/createuser",No login required
router.post('/createuser',[
     body('name','Name should be of minimum 3 characters').isLength({ min: 3 }),
body('email','Enter valid email').isEmail(),
body('password','Password should be of minimum length 4').isLength({ min: 4 })],async(req,res)=>{
     const errors = validationResult(req);
     //if there are any errors return bad request and errors
     if (!errors.isEmpty()) {
       return res.status(400).send({ errors: errors.array() });
     }

//checking if email already exists or not
  try{let user= await User.findOne({email:req.body.email})
  if(user){
    return res.status(400).json({error:"email already exist"});
  }
  //using bycrypt for hash generation and adding salt
   const salt = await bcrypt.genSaltSync(10);
  const Secpassword= await bcrypt.hashSync(req.body.password, salt);
 
  //create new user
     user = await User.create({
       name: req.body.name,
       email: req.body.email,
       password: Secpassword
     });
     const data={
      user:{
      id:user.id
      }
     }
     const token= jwt.sign(data, JWT_Secret);
    res.json({token:token})}
    
     catch (error) {
          
          console.error(error);
          res.status(500).json({ error: 'Server error' });
        }
 })
 
 //Authenticate  a user using:Post "/api/auth/login",No login required
 router.post('/login',[

body('email','Enter valid email').isEmail(),
body('password','Password cannot be blank').exists()
],async(req,res)=>{
  let success= false;
  const errors = validationResult(req);
  //if there are any errors return bad request and errors
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
 const {email,password}=req.body;
 try {
  let user=await User.findOne({email})
  if(!user){
    return res.status(400).json({success,error:"Please provide correct credentials"})
  }
  const passcheck=await bcrypt.compare(password,user.password);
  if(!passcheck){
    return res.status(400).json({success,error:"Please provide correct credentials"})
  }
  const data={
    user:{
    id:user.id
    }
   }
   const token= jwt.sign(data, JWT_Secret);
   success=true;
  res.json({success,token:token})
 } catch (error) {
  console.error(error);
          res.status(500).json({ error: 'Server error' });
 }
})
//Get logged user details using:Post "/api/auth/getuser", login required
router.post('/getuser',fetchuser,async(req,res)=>{
    
try {
  const userid=req.user.id;
  //-password-it ensures that the password is excluded 
  const user=await User.findById(userid).select("-password")
  res.send({user})
} catch (error) {
  console.error(error);
          res.status(500).json({ error: 'Server error' });
 
}
  })
module.exports = router