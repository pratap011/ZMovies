//import axios here

//const axios = require('axios');

const submitButtonHandler = () =>{
  console.log("in handler")
  let name = document.getElementById("name");
  let password = document.getElementById("password");
  const errorPassword = document.getElementById("error_password");
  const errorName = document.getElementById("error_name");

  if (!name.value || !password.value){
    alert("Name and password is required!");
  }

  axios.post("/login",{name:name.value,password:password.value},{headers: {
    // Overwrite Axios's automatically set Content-Type
    'Content-Type': 'application/json'
  }})
  .then(function(response){
    if(response.data.error){
      errorName.innerHTML=response.data.error;
      errorName.style.color="red";
      name.style.borderBottomColor="red";
      password.style.borderBottomColor="red";
      
    }
    else{
      location.replace("/home");
    }

  });
}