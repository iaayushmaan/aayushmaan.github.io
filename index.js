var navbar = document.getElementById("navbar");
window.onscroll = function () {
  "use strict";
  if (
    document.body.scrollTop >= 100 ||
    document.documentElement.scrollTop >= 100
  ) {
    navbar.classList.add("nav-colored");
    navbar.classList.remove("navbar");
  } else {
    navbar.classList.add("navbar");
    navbar.classList.remove("nav-colored");
  }
};

function myFunction() {
  var x = document.getElementById("menu");
  if (x.className === "menu") {
    x.className += " responsive";
  } else {
    x.className = "menu";
  }
  var y = document.getElementById("navbar");
  if (y.className === "navbar") {
    navbar.classList.add("nav-colored");
  } else {
    navbar.classList.add("navbar");
  }
}
var typed = new Typed(".typing", {
  strings: ["Developer", "Coder", "Learner"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

let mappingRankColor = new Map([
  ["newbie", "grey"],
  ["pupil", "green"],
  ["specialist", "darkcyan"],
  ["expert", "blue"],
  ["candidate master", "purple"],
  ["master", "orange"],
  ["international master", "orange"],
  ["grandmaster", "red"],
  ["international grandmaster", "red"],
  ["legendary grandmaster", "rgb(150,0,0)"],
]);

var currentRating = document.getElementById("current-rating");
var maxRating = document.getElementById("max-rating");
var currentRank = document.getElementById("current-rank");
var maxRank = document.getElementById("max-rank");
var cpId = document.getElementById("entered-id");
var enteredUserId = document.getElementById("input_user");
var submitButton = document.getElementById("user_submit");
var userlink = document.getElementById("user-link");
var curr = document.getElementsByClassName("curr");
var max = document.getElementsByClassName("max");

submitButton.addEventListener("click", () => {
  check(enteredUserId.value);
});

enteredUserId.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    check(enteredUserId.value);
  }
});

const api_url = "https://codeforces.com/api/user.info?handles=";

async function check(cphandle) {
  const response = await fetch(api_url + cphandle);
  const data = await response.json();
  if (data.status == "OK") {
    if (data.result[0].rating == undefined) {
      currentRating.innerHTML = "Current Rating : Unrated";
    } else {
      currentRating.innerHTML = "Current Rating : " + data.result[0].rating;
    }
    if (data.result[0].maxRating == undefined) {
      maxRating.innerHTML = "Max Rating : Unrated";
    } else {
      maxRating.innerHTML = "Max Rating : " + data.result[0].maxRating;
    }
    if (data.result[0].rank == undefined) {
      currentRank.innerHTML = "Current Rank : -";
    } else {
      currentRank.innerHTML = "Current Rank : " + data.result[0].rank;
    }
    if (data.result[0].maxRank == undefined) {
      maxRank.innerHTML = "Max Rank : -";
    } else {
      maxRank.innerHTML = "Max Rank : " + data.result[0].maxRank;
    }
    entered_id.innerText = cphandle;
    userlink.href = "https://codeforces.com/profile/" + cphandle;

    var curR = data.result[0].rank;
    var maxR = data.result[0].maxRank;
    for (var i = 0; i < curr.length; i++) {
      curr[i].style.color = mappingRankColor.get(curR);
    }

    for (var i = 0; i < max.length; i++) {
      max[i].style.color = mappingRankColor.get(maxR);
    }
  } else {
    alert("User Not Found!");
  }
}

check("lowkeyaayu");

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyKo1bu-VmfPFIuGEw-P_ViBWyjmq9zUJwMmlbXU4D_9NS3oqW0jhEp3gWZ4TW1S8Mb/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => alert("Message Sent Successfully!"))
    .catch((error) => amert("Error!"));
  document.getElementById("contact-form").reset();
});
