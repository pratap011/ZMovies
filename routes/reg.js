const express = require('express');
const app = express();
const path = require('path');
const user = require('../model/user.js');
const bodyParser = require('body-parser');
const register= express.Router();
register.use(bodyParser.json());
const Joi= require('@hapi/joi');

//app.get('/', express.static(path.join(__dirname, 'reg_front')))

register.get("/", (req,res)=>{
  console.log("reached here!");
 res.sendFile(path.join(__dirname, '../public/html', 'register.html'));
 
})

const schema= Joi.object({
  name: Joi.string().required(),
  email:Joi.string().required().email(),
  password: Joi.string().min(6).required()
});


register.post("/", async (req,res,next)=>{
  //validation
  const {error}= schema.validate(req.body);
  if(error){
    res.send({err:error.details[0].message});
  }
  else{
  
    //checking if the user already exists
    const emailExists= await user.findOne({email:req.body.email});
    const nameExists = await user.findOne({name: req.body.name});
    if(emailExists|| nameExists){
      return res.send({err:"Email or Username exists"})}
    else{
      

  console.log("Reached post route");

  //creating and storing the user in the database
  console.log(req.body);
  const newUser = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try{
    const savedUser = await newUser.save();
    res.send({msg: "Successfully registered!"});
  }
  catch (err) {
    res.send(err);
  }
}

 
  }
    
})


module.exports = register;