const express = require('express');
const app = express();
const path = require('path');
const user = require('../model/user.js');
const mail= require('mailgun-js')({apiKey:'b9857a58768ddf8a6b21c1e3cb49b1d8-ea44b6dc-fc8ed0a7', domain:'https://app.mailgun.com/app/sending/domains/sandbox3fa53bc23dda4d12a2e4c0de59295aac.mailgun.org'});
const bodyParser = require('body-parser');
const recovery= express.Router();
recovery.use(bodyParser.json());

recovery.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, "../public/html", "recovery.html"));
});

recovery.post("/", async (req,res)=>{
  const userExists = await user.findOne({email:req.body.email});

  //console.log(userExists.password);
  if(!userExists){
    res.send({err: "Please enter a registered email."});
  }
  else{
    var data = {
      from: 'Excited User <pratapsimha01@gmail.com>',
      to: userExists,
      subject: 'Hello',
      text: "password"+ userExists.name
    };
     
    mail.messages().send(data, function (error, body) {
      if(error){
        console.log(error);
      }
      else{
        console.log("Email sent", body)
      }
    });
  }
 
})

module.exports = recovery;