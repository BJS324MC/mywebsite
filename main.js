const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");

let blogNumber = 0;

/* Toggle mobile menu */
function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    menu.classList.add("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
  }
}

/* Activate Submenu */
function toggleItem() {
  if (this.classList.contains("submenu-active")) {
    this.classList.remove("submenu-active");
  } else if (menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
  }
}

/* Close Submenu From Anywhere */
function closeSubmenu(e) {
  if (menu.querySelector(".submenu-active")) {
    let isClickInside = menu
      .querySelector(".submenu-active")
      .contains(e.target);

    if (!isClickInside && menu.querySelector(".submenu-active")) {
      menu.querySelector(".submenu-active").classList.remove("submenu-active");
    }
  }
}
/* Event Listeners */
toggle.addEventListener("click", toggleMenu, false);
for (let item of items) {
  if (item.querySelector(".submenu")) {
    item.addEventListener("click", toggleItem, false);
  }
  item.addEventListener("keypress", toggleItem, false);
}
document.addEventListener("click", closeSubmenu, false);

const database = firebase.database(),
  blogs = database.ref("blogs"),
  postButton = document.getElementById('postButton'),
  draft = document.getElementById('draft'),
  gallery = document.getElementById('gallery');
//users = database.ref("users");

async function newBlog() {
  let snapshot = await blogs.child("length").get();
  if (snapshot.exists()) {
    console.log(snapshot.val());
    blogNumber = snapshot.val();
  } else {
    console.log("No data available");
  }
  blogs.child(blogNumber).update({
    title: draft.children[0].innerText,
    body: {
      0: draft.children[1].innerText
    },
    postedTime: Date.now(),
    editedTime: Date.now()
  }, (error) => {
    if (error) {
      // The write failed...
      alertUser("Posting failed. Try again later?");
    } else {
      // Data saved successfully!
      alertUser("Success! Your blog will show up soon.");
    }
  });
  blogs.child("length").update(blogNumber + 1);
}
async function loadBlogs(){
  let snapshot = await blogs.get();
  if (snapshot.exists()) {
    let result = snapshot.val()
    console.log(result);
    for(let i = 0; i < result.length; i++){
      blogbox = document.createElement("div");
      blogbox.classList.add("blogbox");
      title = document.createElement("p");
      title.classList.add("title");
      title.innerText = result[i].title;
      blogbox.addEventListener("click", () => {
        document.write(result[i].body)
      });
      blogbox.appendChild(title);
      gallery.appendChild(blogbox);
    }
  } else {
    console.log("No data available");
  }
}
function alertUser(msg) {
  alert(msg);
}
postButton?.addEventListener('click', () => newBlog());
if(gallery) loadBlogs();
/**
 * 
  games.child(blogNumber).on("value", snap => {
    if (!snap.val() || !snap.val().gameStarted) return;
    curr = "X";
    restart();
    setVs(snap.val().opponent);
    initUpdates();
  });
  games.child(opKey).onDisconnect().remove();
 * function updateUser() {
  users.update({
    [uid]: thisUser
  });
  username.innerText = thisUser.username;
  profile.querySelector("span").innerText = thisUser.points;
  profile.querySelector("img").src = thisUser.picture || "images/nobody.png";
  descript.querySelector("span").innerText = thisUser.description;
  if (isMatching) games.update({
    [opKey]: {
      "host": thisUser,
      "opponent": false,
      "gameStarted": false,
      board: Array.from({ length: 9 }, a => " "),
      turn: turn
    }
  });
}

function setAccountInfo(user) {
  thisUser.username = user.displayName;
  thisUser.picture = user.photoURL;
  thisUser.description = "";
  updateUser();
}
 */