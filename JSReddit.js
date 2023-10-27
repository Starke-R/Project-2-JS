
fetch('https://dummyjson.com/posts/1')
.then(res => res.json())
.then((postone) => { 
  
let first = document.getElementById("title");
first.innerHTML = JSON.stringify(postone.title).replaceAll('"', "");
document.body.append(first);

let second = document.getElementById("tags");
second.innerHTML = JSON.stringify(postone.tags).replaceAll("[", "").replace("]", "").replaceAll('"', "");
document.body.append(second);
  
let third = document.getElementById("bod");
third.innerHTML = JSON.stringify(postone.body).replaceAll('"', "");
document.body.append(third);
});
