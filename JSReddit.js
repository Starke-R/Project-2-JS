// Check if local storage is empty, if it is, fetch the posts from the API
let checkStorage = localStorage.getItem("storingValues");

if (checkStorage == null) {


  // Fetching posts from API
  fetch('https://dummyjson.com/posts/')
    .then(res => res.json())
    .then((posts) => {

      let post = posts;

      for (let i = 0; i < post.posts.length; i++) {
        let divPost = document.createElement("div");
        let votePost = document.createElement("div");

        // Printing title
        let postTitle = post.posts[i].title;
        divPost.innerHTML = "<h1>" + postTitle + "</h1>";

        // Printing first tag
        let postTag = post.posts[i].tags;
        let tagOne = postTag.slice(0, 1);
        divPost.innerHTML += "<h2>" + tagOne + "</h2>";

        // Second tag
        let tagTwo = postTag.slice(1, 2);
        divPost.innerHTML += "<h2>" + tagTwo + "</h2>";

        // Third tag
        let tagThree = postTag.slice(2, 3);
        divPost.innerHTML += "<h2>" + tagThree + "</h2>";
        divPost.innerHTML += "<br>"
        divPost.innerHTML += "<br>"

        // Printing main post
        let postBody = post.posts[i].body;
        divPost.innerHTML += "<h3>" + postBody + "</h3>";

        // Printing number of likes
        let postLikes = post.posts[i].reactions;
        votePost.innerHTML += "<h6>" + postLikes + "</h6>" + "<button>↑</button>" + "<button>↓</button>";



        // Adding classes to the like button and dislike button
        let btns = document.getElementsByTagName("button")

        for (let i = 0; i < btns.length; i++) {
          
          if (btns[i].textContent === "↑") {
            btns[i].classList.add("likeButton");
            btns[i].addEventListener("click", function(){
              
          })
          
        }
          if (btns[i].textContent === "↓") {
            btns[i].classList.add("dislikeButton");
          }
          
        }


        document.getElementById("oldPostsDiv").appendChild(divPost);
        document.getElementById("oldPostsDiv").appendChild(votePost);
        divPost.classList.add("oldPosts");
        votePost.classList.add("oldVotePosts");


        // Adding the fetched posts to local storage
        let checkStorage = localStorage.getItem("storingValues");

        if (checkStorage != null) {

          let storeValues = [postTitle, tagOne, tagTwo, tagThree, postBody, postLikes]

          let storingPosts = JSON.parse(localStorage.getItem("storingValues"));
          storingPosts.push(storeValues);
          localStorage.setItem("storingValues", JSON.stringify(storingPosts));
        }

        else {

          let storeValues = [postTitle, tagOne, tagTwo, tagThree, postBody, postLikes]
          let storingPosts = [storeValues];
          localStorage.setItem("storingValues", JSON.stringify(storingPosts));
        }

      }
    }
    );
}

// If local storage isn't empty, print out content
else {


  // When page is reloaded, new posts that are saved in local storage are reprinted
  window.onload = function () {

    // Check if local storage is empty, else print out content
    let checkStorage = localStorage.getItem("storingValues");


    if (checkStorage != null) {

      let retrievedValues = JSON.parse(localStorage.getItem("storingValues"));

      for (let i = 0; i < retrievedValues.length; i++) {

        let values = retrievedValues[i];

        let divPost = document.createElement("div");
        let votePost = document.createElement("div");

        let postNewTitle = values[0];
        let postNewTagOne = values[1];
        let postNewTagTwo = values[2];
        let postNewTagThree = values[3];
        let postNewPost = values[4];
        let postNewLikes = values[5];

        divPost.innerHTML += "<h1>" + postNewTitle + "</h1>";
        divPost.innerHTML += "<h2>" + postNewTagOne + "</h2>";
        divPost.innerHTML += "<h2>" + postNewTagTwo + "</h2>";
        divPost.innerHTML += "<h2>" + postNewTagThree + "</h2>";
        divPost.innerHTML += "<br>"
        divPost.innerHTML += "<br>"
        divPost.innerHTML += "<h3>" + postNewPost + "</h3>";
    
        votePost.innerHTML += "<h6>" + postNewLikes + "</h6>" + "<button>↑</button>" + "<button>↓</button>";

        // Adding class for styling in CSS
        divPost.classList.add("newPosts");
        votePost.classList.add("newVotePosts");

        // Adding classes to the like button and dislike button
        let btns = document.getElementsByTagName("button")
        for (let i = 0; i < btns.length; i++) {
          if (btns[i].textContent === "↑") {

            btns[i].classList.add("likeButton");
            btns[i].addEventListener("click", function(){


              //let up = postNewLikes;

              let up = btns[i];


              
              

              console.log(up)

              //document.getElementById("newPostsDiv").appendChild(votePost);
              
            })
            
        
        
        
        }


          if (btns[i].textContent === "↓") {
            btns[i].classList.add("dislikeButton");
          }
        }


        document.getElementById("newPostsDiv").appendChild(divPost);
        document.getElementById("newPostsDiv").appendChild(votePost);
      }
    }
  }
}



// Open collapsing section to create posts
let collapse = document.getElementsByClassName("createButton");

for (let i = 0; i < collapse.length; i++) {
  collapse[i].addEventListener("click", function () {
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
    let votePost = document.createElement("div");

    let postNewTitle = document.getElementById("inputTitle").value;
    let postNewTagOne = document.getElementById("inputTagOne").value;
    let postNewTagTwo = document.getElementById("inputTagTwo").value;
    let postNewTagThree = document.getElementById("inputTagThree").value;
    let postNewPost = document.getElementById("inputPost").value;
    let postNewLikes =  0;

    // If title and post input fields are empty, nothing is posted.
    if (inputTitle.value == "" || inputPost.value == "") {
      alert("Title and post cannot be empty");
    }
    else {
      divPost.innerHTML += "<h1>" + postNewTitle + "</h1>";
      divPost.innerHTML += "<h2>" + postNewTagOne + "</h2>";
      divPost.innerHTML += "<h2>" + postNewTagTwo + "</h2>";
      divPost.innerHTML += "<h2>" + postNewTagThree + "</h2>";
      divPost.innerHTML += "<br>"
      divPost.innerHTML += "<br>"
      divPost.innerHTML += "<h3>" + postNewPost + "</h3>";

      votePost.innerHTML += "<h6>" + postNewLikes + "</h6>" + "<button>↑</button>" + "<button>↓</button>";


      let newTags = document.getElementsByTagName("h2");
      for (let i = 0; i < newTags.length; i++) {
        newTags[i].classList.add("tags");
      }

      // Adding class for styling in CSS
      divPost.classList.add("newPosts");
      votePost.classList.add("newVotePosts");

      document.getElementById("newPostsDiv").appendChild(divPost);
      document.getElementById("newPostsDiv").appendChild(votePost);
    }

    // Inserting new posts above the old ones
    let previousPosts = document.getElementById("newPostsDiv");
    previousPosts.insertBefore(divPost, votePost, previousPosts.firstChild);

    // Clearing fields after getting the values
    document.getElementById("inputTitle").value = "";
    document.getElementById("inputTagOne").value = "";
    document.getElementById("inputTagTwo").value = "";
    document.getElementById("inputTagThree").value = "";
    document.getElementById("inputPost").value = "";
    

    // Adding classes to the like button and dislike button
    let btns = document.getElementsByTagName("button")
    for (let i = 0; i < btns.length; i++) {
      if (btns[i].textContent === "↑") {
        btns[i].classList.add("likeButton");
        btns[i].addEventListener("click", function(){
              
          for (let i = 0; i < btns[i].length; i++) {
            console.log(btns[i]);
          }
      })
    }
      if (btns[i].textContent === "↓") {
        btns[i].classList.add("dislikeButton");
      }
    }


    // Adding new posts to local storage
    let checkStorage = localStorage.getItem("storingValues");

    if (checkStorage != null) {

      let storeValues = [postNewTitle, postNewTagOne, postNewTagTwo, postNewTagThree, postNewPost, postNewLikes]

      let storingPosts = JSON.parse(localStorage.getItem("storingValues"));
      storingPosts.unshift(storeValues);
      localStorage.setItem("storingValues", JSON.stringify(storingPosts));
    }

    else {

      let storeNewValues = [postNewTitle, postNewTagOne, postNewTagTwo, postNewTagThree, postNewPost, postNewLikes]
      let storingPosts = [storeNewValues];
      localStorage.setItem("storingValues", JSON.stringify(storingPosts));
    }

  }
  postButton.addEventListener("click", onClick);


  /*
  let up = document.getElementsByClassName("likeButton");
  for (var i = 0; i < items.length; i++) {
    up[i].addEventListener("click", upVote);

  }

*/

/*
function upVote() {
  let up = document.getElementsByTagName("h6");
  for (let i = 0; i < up.length; i++) {
  console.log(up[i].firstChild.data);
} 
}
*/


/*
function upVote() {
  let up = document.getElementsByTagName("h6");
  for (let i = 0; i < up.length; i++) {
  console.log(up[i].firstChild.data);
} 
}*/