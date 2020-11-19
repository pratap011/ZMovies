

function logout(){
  document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  //console.log(cook);
//   cook.userData+";expires=Thu, 01 Jan 1970 00:00:00 UTC;";
 location.replace("/login");
 }
 //reroutes to home
 function reroute(){
  location.replace("/home");
}
 const search = document.getElementById("search_box");
search.addEventListener("keyup", ()=>{
  if(event.key=="Enter"){
  //   axios.post("/search", {search:search.value},{headers: {
  //     // Overwrite Axios's automatically set Content-Type
  //     'Content-Type': 'application/json'
  //   }})
  //   .then((response)=>{
  //     console.log("data");
  //   })

  // }
  location.replace("/search?searchText="+ search.value);

  }
})



axios.get("/mylist/api")
.then((response)=>{
  const empty = document.getElementById("empty");
  empty.style.display="none";
  console.log(response.data.likes);
  if(response.data.likes.length==0){
  empty.style.display="block";
  }
  else{
  for(i=0;i<=response.data.likes.length;i++){
  const url = 'https://api.themoviedb.org/3/search/multi?api_key=c03c92e8601adde4286a754dfb826014&language=en-US&query='+response.data.likes[i]+'&page=1&include_adult=false'
  fetch(url)
  .then((data)=>{
    data.json().then((info)=>{
      const image = document.createElement("img");
      if(info.results[0].poster_path){
        console.log(info.results[0].poster_path)
      image.setAttribute("src", "https://image.tmdb.org/t/p/w500/"+info.results[0].poster_path);
      }
      else{
        image.setAttribute("src", "https://image.tmdb.org/t/p/w500/"+info.results[0].profile_path);
      }
      image.setAttribute("width", "auto");
        image.setAttribute("height", "300");
        image.style.borderRadius="7%";
        image.style.padding="10px"
        const content = document.getElementById("liked_content");
        content.appendChild(image);
      image.addEventListener("click",()=>{
        if(info.results[0].original_name){
          location.replace("/search?searchText="+info.results[0].original_name);
        }
        else{
          location.replace("/search?searchText="+info.results[0].title);
        }
      })

  

    })

  })
  }
}
});

