const express = require('express');
const app = express();
const path = require('path');
const user = require('../model/user.js');
const bodyParser = require('body-parser');
const url = require('url');
const mylist = express.Router();
mylist.use(bodyParser.json());


mylist.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, "../public/html", "mylist.html"));

})
mylist.get("/api", (req,res)=>{
    // const userName = user.findOne({name: req.cookies.userData.name});
    // console.log(userName.password);
    const userName = user.findOne();
    user.findOne({name:req.cookies.userData.name }, function(err, document) {
      res.send({likes: document.liked});
    });
  }
    );
    


mylist.get("/check",(req,res)=>{
  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject.searchName);
  user.findOne({name:req.cookies.userData.name }, function(err,obj) {
    console.log(obj.liked);
    if(obj.liked.indexOf(queryObject.searchName)>-1){
      res.send({msg:"Added"})
    }
    else{
      res.send({err_msg: "Not added"})
    }
  })
    
 
  // for(i=0;i<=userExists.liked.length;i++){
  //   if(req.body.movie==userExists.liked[i]){
  //     console.log("yes")
  //   }
  // }
})

mylist.post("/", (req,res)=>{
  const filter = {name: req.cookies.userData.name};

  const newValue= {$push: {liked:[req.body.like]}};
  user.updateOne(filter,newValue, (err,result)=>{
    if(err){console.log(err)}
    else{
      res.send({msg: "Added"});
    }
  })
});

module.exports = mylist;