
// Fetching posts from API
fetch('https://dummyjson.com/posts/')
  .then(res => res.json())
  .then((posts) => {

    let post = posts;

    for (let i = 0; i < post.posts.length; i++) {
      let divPost = document.createElement("div");

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

      // Printing main post
      let postBody = post.posts[i].body;
      divPost.innerHTML += "<h3>" + postBody + "</h3>";

      // Printing number of likes
      let postLikes = post.posts[i].reactions;
      divPost.innerHTML += "<h6>" + postLikes + "</h6>" + "<button>↑</button>" + "<button>↓</button>";

      // Adding classes to the like button and dislike button
      let btns = document.getElementsByTagName("button");
      for (let i = 0; i < btns.length; i++) {
        if (btns[i].textContent === "↑") {
          btns[i].classList.add("likeButton");

        }
      }
      if (btns[i].textContent === "↓") {
        btns[i].classList.add("dislikeButton");
      }

      document.getElementById("oldPostsDiv").appendChild(divPost);
      divPost.classList.add("oldPosts");

    }
  }
  );

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
  let postNewTitle = document.getElementById("inputTitle").value;
  let postNewTagOne = document.getElementById("inputTagOne").value;
  let postNewTagTwo = document.getElementById("inputTagTwo").value;
  let postNewTagThree = document.getElementById("inputTagThree").value;
  let postNewPost = document.getElementById("inputPost").value;


  // If title and post input fields are empty, nothing is posted.
  if (inputTitle.value == "" || inputPost.value == "") {
    alert("Title and post cannot be empty");
  }
  else {
    divPost.innerHTML += "<h1>" + postNewTitle + "</h1>";
    divPost.innerHTML += "<h2>" + postNewTagOne + "</h2>";
    divPost.innerHTML += "<h2>" + postNewTagTwo + "</h2>";
    divPost.innerHTML += "<h2>" + postNewTagThree + "</h2>";
    divPost.innerHTML += "<h3>" + postNewPost + "</h3>";
    divPost.innerHTML += "<h6>" + "0" + "</h6>" + "<button>↑</button>" + "<button>↓</button>";

    // Adding class for styling in CSS
    divPost.classList.add("newPosts");

    document.getElementById("newPostsDiv").appendChild(divPost);
  }

  // Inserting new posts above the old ones
  let previousPosts = document.getElementById("newPostsDiv");
  previousPosts.insertBefore(divPost, previousPosts.firstChild);

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
    }
    if (btns[i].textContent === "↓") {
      btns[i].classList.add("dislikeButton");
    }
  }


  // Adding posts to local storage
  let checkStorage = localStorage.getItem("storingValues");

  if (checkStorage != null) {

  let storeValues = [postNewTitle, postNewTagOne, postNewTagTwo, postNewTagThree, postNewPost]

  let storingPosts = JSON.parse(localStorage.getItem("storingValues"));
  storingPosts.unshift(storeValues);
  localStorage.setItem("storingValues", JSON.stringify(storingPosts));
  }

  else {

    let storeValues = [postNewTitle, postNewTagOne, postNewTagTwo, postNewTagThree, postNewPost]
    let storingPosts = [storeValues];
    localStorage.setItem("storingValues", JSON.stringify(storingPosts));
  }
  /*
    // Saving values of new posts in local storage
    let storeTitle = JSON.stringify(postNewTitle);
    let storeTagOne = JSON.stringify(postNewTagOne);
    let storeTagTwo = JSON.stringify(postNewTagTwo);
    let storeTagThree = JSON.stringify(postNewTagThree);
    let storeBody = JSON.stringify(postNewPost);
  
    storingValues.push(storeTitle, storeTagOne, storeTagTwo, storeTagThree, storeBody);
    localStorage.setItem("values", storingValues);*/

  /*
    localStorage.setItem("storeTitle", storeTitle);
    localStorage.setItem("storeTagOne", storeTagOne);
    localStorage.setItem("storeTagTwo", storeTagTwo);
    localStorage.setItem("storeTagThree", storeTagThree);
    localStorage.setItem("storeBody", storeBody);
  */

}
postButton.addEventListener("click", onClick);

// When page is reloaded, new posts that are saved in local storage are reprinted
window.onload = function () {

  // Check if there is a Title value saved in local storage, if there is, reprint all values saved 
  let checkStorage = localStorage.getItem("storingValues");


  if (checkStorage != null) {

    let retrievedValues = JSON.parse(localStorage.getItem("storingValues"));

    for (let i = 0; i < retrievedValues.length; i++) {

    let values = retrievedValues[i];

    let divPost = document.createElement("div");

    let postNewTitle = values[0];
    let postNewTagOne = values[1];
    let postNewTagTwo = values[2];
    let postNewTagThree = values[3];
    let postNewPost = values[4];

    divPost.innerHTML += "<h1>" + postNewTitle + "</h1>";
    divPost.innerHTML += "<h2>" + postNewTagOne + "</h2>";
    divPost.innerHTML += "<h2>" + postNewTagTwo + "</h2>";
    divPost.innerHTML += "<h2>" + postNewTagThree + "</h2>";
    divPost.innerHTML += "<h3>" + postNewPost + "</h3>";
    divPost.innerHTML += "<h6>" + "0" + "</h6>" + "<button>↑</button>" + "<button>↓</button>";

    // Adding class for styling in CSS
    divPost.classList.add("newPosts");

    // Adding classes to the like button and dislike button
    let btns = document.getElementsByTagName("button")
    for (let i = 0; i < btns.length; i++) {
      if (btns[i].textContent === "↑") {
        btns[i].classList.add("likeButton");
      }
      if (btns[i].textContent === "↓") {
        btns[i].classList.add("dislikeButton");
      }
    }


    document.getElementById("newPostsDiv").appendChild(divPost);
  }
}
}