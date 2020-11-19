

//File for search in JS
function logout(){
  document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  //console.log(cook);
//   cook.userData+";expires=Thu, 01 Jan 1970 00:00:00 UTC;";
 location.replace("/login");
 }

 function reroute(){
  location.replace("/home");
}

function routeMylist(){
  location.replace("/mylist");
}


const incorrectSearch= document.getElementById("err");
const queryParams = new URLSearchParams(window.location.search);
 console.log(queryParams.body)
 if(queryParams.has("searchText")){
   const query = queryParams.get('searchText');
   //console.log(query);
   const url = 'https://api.themoviedb.org/3/search/multi?api_key=c03c92e8601adde4286a754dfb826014&language=en-US&query='+query+'&page=1&include_adult=false';
   const image= document.getElementById("search_img");
   const info = document.getElementById("search_info");
    fetch(url)
    .then((response)=>{
      response.json().then((data)=>{
        const img = document.createElement('img');
        if(data.results[0]){
        if(data.results[0].poster_path){
          img.setAttribute("src", "https://image.tmdb.org/t/p/w500"+ data.results[0].poster_path);
        }
        else{
        img.setAttribute("src", "https://image.tmdb.org/t/p/w500"+ data.results[0].profile_path);
        }
        img.setAttribute("width", "auto");
        img.setAttribute("height", "500");
        img.setAttribute("border-radius", "10%");
        img.style.borderRadius="2%";
        image.style.padding="10px"
        image.appendChild(img);
        if(data.results[0].name && data.results[0].known_for){
          const simCont = document.getElementById("sim_content")
          simCont.style.display="none";
          const title = document.createElement("h2");
          const hr = document.createElement("hr");
          title.innerHTML = data.results[0].name+ "<br>";

          info.appendChild(title);
          info.appendChild(hr);
          const descript = document.createElement("h3");
          descript.innerHTML= " <br> Proffession: "+ data.results[0].known_for_department+"<br> <br>";
          info.appendChild(descript);
          const movieTemp = document.createElement("div");
          movieTemp.className="movie_temp";
          movieTemp.style.backgroundColor="black";
          movieTemp.style.borderRadius="7%"
          movieTemp.style.padding="10px";
          const knownFor = document.createElement("h3");
          const breakline = document.createElement("br");
          const popularity = document.createElement("h3");
          popularity.innerHTML= " Popularity: " + data.results[0].popularity+"<br> <br>";
          info.appendChild(popularity);
          knownFor.innerHTML = "Known for: <br> <br>"
          for(i=0;i<=data.results[0].known_for.length;i++){
            if(data.results[0].known_for[i].original_title){
            knownFor.innerHTML += i+1+"." +data.results[0].known_for[i].original_title+ "<br> <br>";}
            else{
              knownFor.innerHTML += i+1+"." +data.results[0].known_for[i].original_name+ "<br> <br>";
            }
            movieTemp.appendChild(knownFor);
            info.appendChild(movieTemp);
        
          }
         
        }

        else{
          const title = document.createElement("h2");
          const hr = document.createElement("hr");
          const descript = document.createElement("h3");
          if(data.results[0].title){
          title.innerHTML = data.results[0].title;
          descript.innerHTML= " <br> <br> "+ data.results[0].overview+"<br><br><br>"+ "Release Date : " + data.results[0].release_date+"<br> <br> <br>";
          }
          else{
            title.innerHTML = data.results[0].original_name;
            descript.innerHTML= " <br> <br> "+ data.results[0].overview+"<br><br><br>"+ "Release Date : " + data.results[0].first_air_date +"<br> <br> <br>";
          }

           info.appendChild(title);
          info.appendChild(hr);
          info.appendChild(descript);
          info.style.paddingLeft="10px";
          info.style.width="40%";
          const like = document.createElement("div");
          like.className="like_btn";
          
          console.log(data.results[0].overview);
          console.log(title.innerHTML);
          const likeBtn = document.createElement("input");
          axios.get("mylist/check?searchName="+title.textContent)
          .then((response)=>{
            if(response.data.msg){
              console.log("yes");
  
              likeBtn.setAttribute("type", "button");
              likeBtn.setAttribute("value", "Added");
              likeBtn.style.backgroundColor="green";
              likeBtn.style.color="white";
              likeBtn.style.padding="6px";
              likeBtn.style.borderRadius="3%";
              likeBtn.style.border="none";
              like.appendChild(likeBtn);
              info.appendChild(like);
            }

            else if(response.data.err_msg)
            {
          
          likeBtn.setAttribute("type", "button");
          likeBtn.setAttribute("value", "Add to My List");
          likeBtn.style.backgroundColor="red";
          likeBtn.style.color="white";
          likeBtn.style.padding="6px";
          likeBtn.style.borderRadius="3%";
          likeBtn.style.border="none";
          likeBtn.style.cursor="pointer";
          like.appendChild(likeBtn);
          info.appendChild(like);
            
          like.addEventListener("click", ()=>{
            axios.post("/mylist", {like: title.textContent})
            .then((response)=>{
              likeBtn.setAttribute("value", "Added");
              likeBtn.style.backgroundColor="green";
              
            })
          })
        }
          })
          //console.log(data);
          const similar = document.getElementById("similar_content");
          if(data.results[0].original_title){
            const simUrl = 'https://api.themoviedb.org/3/movie/'+data.results[0].id+'/similar?api_key=c03c92e8601adde4286a754dfb826014&language=en-US&page=1'
            fetch(simUrl)
            .then((response)=>{
              response.json().then((data)=>{
                for(i=0; i<=data.results.length;i++){
                  //console.log(data.results[i].original_name);
                  const sim = document.createElement("div");
                  sim.className="sim_con";
                  const img = document.createElement('img');
                            img.setAttribute("src", "https://image.tmdb.org/t/p/w500"+ data.results[i].poster_path);
                            img.setAttribute("width", "auto");
                            img.setAttribute("height", "250");
                            img.setAttribute("border-radius", "10%");
                            img.style.borderRadius="2%";
                            sim.style.padding="10px"
                            sim.appendChild(img);
                            const name = document.createElement('h4');
                            var t = document.createTextNode(data.results[i].original_title);
                            name.appendChild(t);
                            
                            similar.appendChild(sim);
                            sim.appendChild(t);
                            sim.style.textAlign="center";
                            sim.style.fontWeight="550";
                            sim.style.color="white";
                            sim.style.fontFamily="Arial"
                          console.log(sim.textContent);
                            sim.addEventListener("click", ()=>{
                              location.replace("/search?searchText="+sim.textContent);
                            })
                            
            
                }
              })
            })
          }
          else if(data.results[0].original_name){
            const simUrl = 'https://api.themoviedb.org/3/tv/'+data.results[0].id+'/similar?api_key=c03c92e8601adde4286a754dfb826014&language=en-US&page=1'
            fetch(simUrl)
            .then((response)=>{
              response.json().then((data)=>{
                for(i=0; i<=data.results.length;i++){
                  //console.log(data.results[i].original_name);
                  const sim = document.createElement("div");
                  sim.className="sim_con";
                  const img = document.createElement('img');
                            img.setAttribute("src", "https://image.tmdb.org/t/p/w500"+ data.results[i].poster_path);
                            img.setAttribute("width", "auto");
                            img.setAttribute("height", "250");
                            img.setAttribute("border-radius", "10%");
                            img.style.borderRadius="2%";
                            sim.style.padding="10px"
                            sim.appendChild(img);
                            const name = document.createElement('h4');
                            var t = document.createTextNode(data.results[i].original_name);
                            name.appendChild(t);
                            
                            similar.appendChild(sim);
                            sim.appendChild(t);
                            sim.style.textAlign="center";
                            sim.style.fontWeight="550";
                            sim.style.color="white";
                            sim.style.fontFamily="Arial"
                          console.log(sim.textContent);
                            sim.addEventListener("click", ()=>{
                              location.replace("/search?searchText="+sim.textContent);
                            })
                            
            
                }
              })
            })
          }
        }
      }
      else{
        incorrectSearch.style.display="block";
        const simCont = document.getElementById("sim_content")
        simCont.style.display="none";
        const hr = document.getElementsByTagName("hr")
        hr.style.display="none";
      }
      })
  

    } )

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