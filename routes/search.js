const express = require('express');
const app = express();
const path = require('path');
const user = require('../model/user.js');
const bodyParser = require('body-parser');
const search = express.Router();
search.use(bodyParser.json());

search.get("/", (req,res,next)=>{
  if(req.cookies.userData){
    res.sendFile(path.join(__dirname, "../public/html", "search.html"));
  }
  else{
    res.redirect("/login");
  }
})

search.post("/", (req,res)=>{
  console.log(req.body.search);
  res.redirect("/search?searchText="+req.body.search);
})


module.exports = search;