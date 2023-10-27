fetch('https://dummyjson.com/posts/')
.then(res => res.json())
.then((posts) => { 
  
  let pozt = posts;

  for (let i = 0; i < pozt.posts.length; i++) {
    let divs = document.createElement("div");

    let postTitle = pozt.posts[i].title;
    divs.innerHTML = "<h1>" + postTitle + "</h1>";
    
    let postTag = pozt.posts[i].tags;
    divs.innerHTML += "<h2>" + postTag + "</h2>";

    let postBody = pozt.posts[i].body;
    divs.innerHTML += "<h3>" + postBody + "</h3>";

    document.body.append(divs);
    divs.classList.add("posted");
}


}
);

