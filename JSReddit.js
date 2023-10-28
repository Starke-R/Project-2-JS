fetch('https://dummyjson.com/posts/')
.then(res => res.json())
.then((posts) => { 
  
  let post = posts;

    for (let i = 0; i < post.posts.length; i++) {
      let divs = document.createElement("div");

      //Hämtar och printar titeln
      let postTitle = post.posts[i].title;
      divs.innerHTML = "<h1>" + postTitle + "</h1>";
      
      //Hämtar och printar första tagen
      let postTag = post.posts[i].tags;
      let tagOne = postTag.slice(0, 1);
      divs.innerHTML += "<h2>" + tagOne + "</h2>";

      //Hämtar och printar andra tagen
      let tagTwo = postTag.slice(1, 2);
      divs.innerHTML += "<h2>" + tagTwo + "</h2>";

      //Hämtar och printar ev. tredje tagen
      let tagThree = postTag.slice(2, 3);
      divs.innerHTML += "<h2>" + tagThree + "</h2>";

      let postBody = post.posts[i].body;
      divs.innerHTML += "<h3>" + postBody + "</h3>";

      document.body.append(divs);
      divs.classList.add("posted");     
    }
  } 
);



//Open collapsing section to create posts
let collapse = document.getElementsByClassName("createButton");

for (let i = 0; i < collapse.length; i++) {
  collapse[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let createPostField = this.nextElementSibling;
    if (createPostField.style.display === "block") {
      createPostField.style.display = "none";
    } else {
      createPostField.style.display = "block";
    }
  });
}