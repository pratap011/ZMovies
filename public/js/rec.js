function submitButtonHandler(){
  console.log("In handler");
  const email = document.getElementById("email");
  const error = document.getElementById("error_name");
  if(!email.value){
    error.innerHTML = "Please enter your email";
    error.style.color="red";
  }
  else{
    axios.post("/recovery", {email:email.value})
    .then((response)=>{
      console.log(response);
    })
    
  }
}