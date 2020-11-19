function submitButtonHandler(){
  console.log("in handler")
  let name = document.getElementById("name");
  let password = document.getElementById("password");
  const email = document.getElementById("email");
  const errorName = document.getElementById("error_name");
  const success = document.getElementById("success");

  if(!name.value || !password.value || !email.value){
    alert("Name and password is required!");
  }
  axios.post("/register", {name:name.value, email:email.value, password: password.value})
  .then((response)=>{
    console.log(response.data.err);
    if(response.data.err){
      errorName.innerHTML = response.data.err;
      errorName.style.color = "red";
    }
    else{
      console.log(response);
      success.innerHTML = response.data.msg;
      success.style.color="green";
    }
  })
}