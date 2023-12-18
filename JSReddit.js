// Check if local storage is empty, if it is, fetch the posts from the API
let checkStorage = localStorage.getItem("storingValues");

if (checkStorage == null) {

  // Fetching posts from API
  fetch("https://dummyjson.com/posts/")
    .then(res => res.json())
    .then((posts) => {

      let post = posts;

      for (let i = 0; i < post.posts.length; i++) {
        let divPost = document.createElement("div");
        let votePost = document.createElement("div");
        let upVote = document.createElement("button");
        let downVote = document.createElement("button");

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
        votePost.innerHTML += "<h6>" + postLikes + "</h6>";

        upVote.innerHTML += "↑";
        downVote.innerHTML += "↓";

        // Upvoting and downvoting eventlisteners
        upVote.addEventListener("click", function () {
          postLikes++;
          votePost.innerHTML = "<h6>" + postLikes + "</h6>"
        });

        downVote.addEventListener("click", function () {
          postLikes--;
          votePost.innerHTML = "<h6>" + postLikes + "</h6>"
        });

        // Appending the divs with new information
        document.getElementById("postsDiv").appendChild(divPost);
        document.getElementById("postsDiv").appendChild(votePost);
        document.getElementById("postsDiv").appendChild(upVote);
        document.getElementById("postsDiv").appendChild(downVote);

        divPost.classList.add("oldPosts");
        votePost.classList.add("oldVotePosts");
        upVote.classList.add("likeButton");
        downVote.classList.add("dislikeButton");

        // Adding the fetched posts to local storage (except for likes, see below*)
        let checkStorage = localStorage.getItem("storingValues");

        if (checkStorage != null) {

          let storeValues = [postTitle, tagOne, tagTwo, tagThree, postBody]

          let storingPosts = JSON.parse(localStorage.getItem("storingValues"));
          storingPosts.push(storeValues);
          localStorage.setItem("storingValues", JSON.stringify(storingPosts));
        }

        else {

          let storeValues = [postTitle, tagOne, tagTwo, tagThree, postBody]
          let storingPosts = [storeValues];
          localStorage.setItem("storingValues", JSON.stringify(storingPosts));
        }

        // *When the page is reloaded, the likes are saved to local storage
        window.onbeforeunload = function () {

          let reactions = document.getElementsByClassName("oldVotePosts");
          let alreadyStoredLikes = [];
          let storeLikes = [];

          for (let i = 0; i < reactions.length; i++) {
            storeLikes = [reactions[i].innerText];
            alreadyStoredLikes.push(storeLikes);

          }
          localStorage.setItem("storingLikes", JSON.stringify(alreadyStoredLikes));
        }
      }
    }
    );
}

// If local storage ISN'T empty, print out the content
else {

  // When page is reloaded, new posts that are saved in local storage are reprinted
  window.onload = function () {

    let retrievedValues = JSON.parse(localStorage.getItem("storingValues"));
    let retrievedReactions = JSON.parse(localStorage.getItem("storingLikes"));

    for (let i = 0; i < retrievedReactions.length; i++) {

      let reactions = retrievedReactions[i];

      let postNewLikes = reactions[0];

      let values = retrievedValues[i];

      let divPost = document.createElement("div");
      let votePost = document.createElement("div");
      let upVote = document.createElement("button");
      let downVote = document.createElement("button");

      let postNewTitle = values[0];
      let postNewTagOne = values[1];
      let postNewTagTwo = values[2];
      let postNewTagThree = values[3];
      let postNewPost = values[4];


      divPost.innerHTML += "<h1>" + postNewTitle + "</h1>";

      if (postNewTagOne) {
        divPost.innerHTML += "<h2>" + postNewTagOne + "</h2>";
      }
      if (postNewTagTwo) {
        divPost.innerHTML += "<h2>" + postNewTagTwo + "</h2>";
      }
      if (postNewTagThree) {
        divPost.innerHTML += "<h2>" + postNewTagThree + "</h2>";
      }

      divPost.innerHTML += "<br>"
      divPost.innerHTML += "<br>"
      divPost.innerHTML += "<h3>" + postNewPost + "</h3>";

      votePost.innerHTML += "<h6>" + postNewLikes + "</h6>";

      upVote.innerHTML += "↑";
      downVote.innerHTML += "↓";

      // Upvoting and downvoting eventlisteners
      upVote.addEventListener("click", function () {
        postNewLikes++;
        votePost.innerHTML = "<h6>" + postNewLikes + "</h6>"
      });

      downVote.addEventListener("click", function () {
        postNewLikes--;
        votePost.innerHTML = "<h6>" + postNewLikes + "</h6>"
      });

      // Appending the divs with new information
      document.getElementById("postsDiv").appendChild(divPost);
      document.getElementById("postsDiv").appendChild(votePost);
      document.getElementById("postsDiv").appendChild(upVote);
      document.getElementById("postsDiv").appendChild(downVote);

      divPost.classList.add("oldPosts");
      votePost.classList.add("oldVotePosts");
      upVote.classList.add("likeButton");
      downVote.classList.add("dislikeButton");

    }
  }
}

// When the page is reloaded, the likes are saved separetely to local storage
window.onbeforeunload = function () {

  let reactions = document.getElementsByClassName("oldVotePosts");
  let alreadyStoredLikes = [];
  let storeLikes = [];

  for (let i = 0; i < reactions.length; i++) {
    storeLikes = [reactions[i].innerText];
    alreadyStoredLikes.push(storeLikes);

  }
  localStorage.setItem("storingLikes", JSON.stringify(alreadyStoredLikes));
}

// Open collapsing a section to create posts
let collapse = document.getElementsByClassName("createButton");
let openClose = document.getElementById("createOpenClose");

for (let i = 0; i < collapse.length; i++) {
  collapse[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let createPostField = this.nextElementSibling;
    if (createPostField.style.display === "block") {
      createPostField.style.display = "none";
      openClose.innerHTML = "Create post";
    } else {
      createPostField.style.display = "block";
      openClose.innerHTML = "Close";
    }
  });
}

// Function for getting input from the "create post"-fields and posting on the page after clicking on "post"-button
function onClick() {
  event.preventDefault();
  let divPost = document.createElement("div");
  let votePost = document.createElement("div");
  let upVote = document.createElement("button");
  let downVote = document.createElement("button");

  let postNewTitle = document.getElementById("inputTitle").value;
  let postNewTagOne = document.getElementById("inputTagOne").value;
  let postNewTagTwo = document.getElementById("inputTagTwo").value;
  let postNewTagThree = document.getElementById("inputTagThree").value;
  let postNewPost = document.getElementById("inputPost").value;
  let postNewLikes = 0;

  // If title and post input fields are empty, nothing is posted.
  if (inputTitle.value == "" || inputPost.value == "") {
    alert("Title and post cannot be empty");
    return;
  }
  else {
    divPost.innerHTML += "<h1>" + postNewTitle + "</h1>";

    if (postNewTagOne) {
      divPost.innerHTML += "<h2>" + postNewTagOne + "</h2>";
    }
    if (postNewTagTwo) {
      divPost.innerHTML += "<h2>" + postNewTagTwo + "</h2>";
    }
    if (postNewTagThree) {
      divPost.innerHTML += "<h2>" + postNewTagThree + "</h2>";
    }

    divPost.innerHTML += "<br>"
    divPost.innerHTML += "<br>"
    divPost.innerHTML += "<h3>" + postNewPost + "</h3>";

    votePost.innerHTML += "<h6>" + postNewLikes + "</h6>";

    upVote.innerHTML += "↑";
    downVote.innerHTML += "↓";

    // Upvoting and downvoting eventlisteners
    upVote.addEventListener("click", function () {
      postNewLikes++;
      votePost.innerHTML = "<h6>" + postNewLikes + "</h6>"
    });

    downVote.addEventListener("click", function () {
      postNewLikes--;
      votePost.innerHTML = "<h6>" + postNewLikes + "</h6>"
    });

    // Adding class for styling in CSS
    document.getElementById("postsDiv").appendChild(divPost);
    document.getElementById("postsDiv").appendChild(votePost);
    document.getElementById("postsDiv").appendChild(upVote);
    document.getElementById("postsDiv").appendChild(downVote);

    divPost.classList.add("oldPosts");
    votePost.classList.add("oldVotePosts");
    upVote.classList.add("likeButton");
    downVote.classList.add("dislikeButton");
  }

  // Inserting new posts above the old ones
  let previousPosts = document.getElementById("postsDiv");
  previousPosts.insertBefore(downVote, previousPosts.firstChild);
  previousPosts.insertBefore(upVote, downVote);
  previousPosts.insertBefore(votePost, upVote);
  previousPosts.insertBefore(divPost, votePost);


  // Clearing fields after getting the values
  document.getElementById("inputTitle").value = "";
  document.getElementById("inputTagOne").value = "";
  document.getElementById("inputTagTwo").value = "";
  document.getElementById("inputTagThree").value = "";
  document.getElementById("inputPost").value = "";


  // Adding new posts to local storage
  let checkStorage = localStorage.getItem("storingValues");

  if (checkStorage != null) {

    let storeValues = [postNewTitle, postNewTagOne, postNewTagTwo, postNewTagThree, postNewPost]

    let storingPosts = JSON.parse(localStorage.getItem("storingValues"));
    storingPosts.unshift(storeValues);
    localStorage.setItem("storingValues", JSON.stringify(storingPosts));
  }

  else {

    let storeNewValues = [postNewTitle, postNewTagOne, postNewTagTwo, postNewTagThree, postNewPost]
    let storingPosts = [storeNewValues];
    localStorage.setItem("storingValues", JSON.stringify(storingPosts));
  }

  // When the page is reloaded, the likes are saved separetely to local storage
  window.onbeforeunload = function () {

    let reactions = document.getElementsByClassName("oldVotePosts");
    let alreadyStoredLikes = [];
    let storeLikes = [];

    for (let i = 0; i < reactions.length; i++) {
      storeLikes = [reactions[i].innerText];
      alreadyStoredLikes.push(storeLikes);

    }
    localStorage.setItem("storingLikes", JSON.stringify(alreadyStoredLikes));
  }
}
postButton.addEventListener("click", onClick);

