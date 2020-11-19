const express = require('express');
const app = express();
const path = require('path');
const user = require('../model/user.js');
const bodyParser = require('body-parser');
const login= express.Router();
login.use(bodyParser.json());
const Joi= require('@hapi/joi');
const cookieParser = require("cookie-parser");




console.log("Reached hereeee");

login.get("/", (req,res)=>{
  console.log("reached reg GET");
  res.sendFile(path.join(__dirname, "../public/html", "login.html"));
  if(req.cookies.userData){
    console.log("You are in");
    res.redirect("/home");
    
  }
  
})


const schema= Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required()
});

login.post("/", async (req,res)=>{

  console.log("reached login post");
  const {error} = schema.validate(req.body);
  if(error){
    //res.setHeader('Content-Type', 'application/json');
    res.send({error:error.details[0].message});
  }
  else{
    const userExists = await user.findOne({name:req.body.name});
    if(userExists){
      if(req.body.password==userExists.password){
        const cookie_data ={
          name: userExists.name,
          password: userExists.password
        }
        console.log("reached cookie");
        res.cookie("userData", cookie_data, { maxAge: 9000000000000});
        res.send({message:"loggedd"});
      }
      else{ 
        res.send({error:"Incorrect password"});
      }
    }
    else{
      res.send({error:"Incorrect username"});
    }

}

})

module.exports = login;

 