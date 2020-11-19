const express = require('express');
const app = express();
const path = require('path');
const user = require('../model/user.js');
const bodyParser = require('body-parser');
const home = express.Router();

home.get("/", (req,res,next)=>{
  if(req.cookies.userData){
    console.log("Cookie done");
    res.sendFile(path.join(__dirname, "../public/html", "home.html"))
  }
  else{
    console.log("No cookie");
    res.redirect("/login");
  }
})

module.exports = home;