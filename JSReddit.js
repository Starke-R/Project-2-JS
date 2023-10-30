
fetch('https://dummyjson.com/posts/')
.then(res => res.json())
.then((posts) => { 
  
  let post = posts;

    for (let i = 0; i < post.posts.length; i++) {
      let divPost = document.createElement("div");

      //Hämtar och printar titeln
      let postTitle = post.posts[i].title;
      divPost.innerHTML = "<h1>" + postTitle + "</h1>";
      
      //Hämtar och printar första tagen
      let postTag = post.posts[i].tags;
      let tagOne = postTag.slice(0, 1);
      divPost.innerHTML += "<h2>" + tagOne + "</h2>";

      //Hämtar och printar andra tagen
      let tagTwo = postTag.slice(1, 2);
      divPost.innerHTML += "<h2>" + tagTwo + "</h2>";

      //Hämtar och printar ev. tredje tagen
      let tagThree = postTag.slice(2, 3);
      divPost.innerHTML += "<h2>" + tagThree + "</h2>";

      //Hämtar och printar inlägget
      let postBody = post.posts[i].body;
      divPost.innerHTML += "<h3>" + postBody + "</h3>";

      document.body.append(divPost);
      divPost.classList.add("oldPosts");     
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



// Function for getting input from the "create post"-fields and posting on the page after clicking on "post"-button
function onClick() {
  event.preventDefault();
  let divPost = document.createElement("div");
  let postNewTitle = document.getElementById("inputTitle").value;
  let postNewTagOne = document.getElementById("inputTagOne").value;
  let postNewTagTwo = document.getElementById("inputTagTwo").value;
  let postNewTagThree = document.getElementById("inputTagThree").value;
  let postNewPost = document.getElementById("inputPost").value;

  divPost.innerHTML += "<h1>" + postNewTitle + "</h1>";
  divPost.innerHTML += "<h2>" + postNewTagOne + "</h2>";
  divPost.innerHTML += "<h2>" + postNewTagTwo + "</h2>";
  divPost.innerHTML += "<h2>" + postNewTagThree + "</h2>";
  divPost.innerHTML += "<h3>" + postNewPost + "</h3>";

  document.body.append(divPost);
  divPost.classList.add("newPosts");
 
  //Clearing fields after getting the values
  document.getElementById("inputTitle").value = "";
  document.getElementById("inputTagOne").value = "";
  document.getElementById("inputTagTwo").value = "";
  document.getElementById("inputTagThree").value = "";
  document.getElementById("inputPost").value = "";

}
postButton.addEventListener("click", onClick);

