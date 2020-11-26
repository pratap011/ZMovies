const http= require('http');
const express= require('express');
const mongo = require('mongoose');
const register = require('./routes/reg.js');
const login = require('./routes/log.js');
const recovery = require('./routes/recovery.js');
const home = require('./routes/home.js');
const mylist = require('./routes/mylist.js');
const search = require('./routes/search.js');
const app = express();
const cookieParser = require('cookie-parser');
const path= require('path');
const url="mongodb+srv://Pratap:pratapmongo@users.oejn7.mongodb.net/Users?retryWrites=true&w=majority";
var PORT = process.env.PORT || 5000;
 mongo.connect(url, { useUnifiedTopology: true }, (err)=>{
   if(err){
    console.log(err);
   }
   else{
     console.log("Connected to the database successfully!");
   }
  
 })
var userNum=0;
 function userCount(req,res,next){
   userNum++ ;
  console.log(userNum)
next()
}

app.use(cookieParser());
app.use(express.static('public'));

// app.get("/", (req,res)=>{
//   res.sendFile(path.join( __dirname, "/public/html", "index.html"))
// });

app.use('/', express.static('./public/html'))
app.use(express.urlencoded({extended: false}));

app.use('/register',userCount, register);
app.use('/login', userCount,login);
app.use('/home',userCount, home);
app.use('/search',userCount, search);
app.use('/mylist',userCount, mylist);



app.listen(PORT, ()=>{
  console.log("The server is up and running");
  });

  
console.log("Hello");
