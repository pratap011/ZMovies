function logout(){
  document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  //console.log(cook);
//   cook.userData+";expires=Thu, 01 Jan 1970 00:00:00 UTC;";
 location.replace("/login");
 }
 
 function routeMylist(){
   location.replace("/mylist");
 }
 const topMovies = document.getElementById("top_mov");
 const movieUrl='https://api.themoviedb.org/3/movie/top_rated?api_key=c03c92e8601adde4286a754dfb826014&language=en-US&page=1'
 fetch(movieUrl)
 .then((response)=>{
  response.json().then(function(data) {
    //console.log(data.results);
    for(i=0; i<=data.results.length;i++){
     
      var newNode = document.createElement('div');
                
                newNode.className = 'top_movie_node';
                const img = document.createElement('img');
                img.setAttribute("src", "https://image.tmdb.org/t/p/w500"+ data.results[i].poster_path);
                img.setAttribute("width", "auto");
                img.setAttribute("height", "250");
                img.setAttribute("border-radius", "10%");
                img.style.borderRadius="2%";
                newNode.appendChild(img);
                //newNode.innerHTML = 
                const name = document.createElement('h4');
                var t = document.createTextNode(data.results[i].title);
                var breaks = document.createElement("br");
                name.appendChild(t);
                
          
                topMovies.appendChild(newNode);
                topMovies.style.display="flex";
                newNode.style.padding="10px";
                newNode.style.textAlign="center";
                newNode.style.fontWeight="550";
                newNode.style.color="white";
                newNode.style.fontFamily="Arial";
                newNode.appendChild(name);
                newNode.addEventListener("click", ()=>{
                  location.replace("/search?searchText="+newNode.textContent);
                })
      
    }
 })
})

const topShows = document.getElementById("top_shows");
const showUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=c03c92e8601adde4286a754dfb826014&language=en-US&page=1';
fetch(showUrl)
.then((response)=>{
  response.json().then((data)=>{
  
    for(i=0; i<=data.results.length;i++){
      //console.log(data.results[i].original_name);
      const shows = document.createElement("div");
      shows.className="top_show";
      const img = document.createElement('img');
                img.setAttribute("src", "https://image.tmdb.org/t/p/w500"+ data.results[i].poster_path);
                img.setAttribute("width", "auto");
                img.setAttribute("height", "250");
                img.setAttribute("border-radius", "10%");
                img.style.borderRadius="2%";
                shows.style.padding="10px"
                shows.appendChild(img);
                const name = document.createElement('h4');
                var t = document.createTextNode(data.results[i].original_name);
                name.appendChild(t);
                
                topShows.appendChild(shows);
                shows.appendChild(t);
                shows.style.textAlign="center";
                shows.style.fontWeight="550";
                shows.style.color="white";
                shows.style.fontFamily="Arial"
              console.log(shows.textContent);
                shows.addEventListener("click", ()=>{
                  location.replace("/search?searchText="+shows.textContent);
                })
                

    }
  })
})

const comedies = document.getElementById("comedy");
const comUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=c03c92e8601adde4286a754dfb826014&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35'
fetch(comUrl)
.then((response)=>{
  response.json().then((data)=>{
    for(i=0; i<=data.results.length;i++){
      //console.log(data.results[i].original_name);
      const com = document.createElement("div");
      com.className="top_com";
      const img = document.createElement('img');
                img.setAttribute("src", "https://image.tmdb.org/t/p/w500"+ data.results[i].poster_path);
                img.setAttribute("width", "auto");
                img.setAttribute("height", "250");
                img.setAttribute("border-radius", "10%");
                img.style.borderRadius="2%";
                com.style.padding="10px"
                com.appendChild(img);
                const name = document.createElement('h4');
                var t = document.createTextNode(data.results[i].original_title);
                name.appendChild(t);
                
                comedies.appendChild(com);
                com.appendChild(t);
                com.style.textAlign="center";
                com.style.fontWeight="550";
                com.style.color="white";
                com.style.fontFamily="Arial"
              console.log(com.textContent);
                com.addEventListener("click", ()=>{
                  location.replace("/search?searchText="+com.textContent);
                })
                

    }
  })
})

function reroute(){
  location.replace("/home");
}

const search = document.getElementById("search_box");
search.addEventListener("keyup", ()=>{
  if(event.key=="Enter"){
    if(search.value.length>0){
    location.replace("/search?searchText="+search.value);
    }
  }
})




