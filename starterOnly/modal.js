function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements

const modalbg = document.querySelector(".bground");
const showModalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector(".modal-body form");

//EVENT LISTENERS

// launch modal event
showModalBtn.forEach(btn => btn.addEventListener("click", toggleModal))
// close modal event
closeModalBtn.addEventListener('click', toggleModal)
// onsubmit form event
form.addEventListener("submit",submitForm )


//FUNCTION

// toggle modal form
function toggleModal() {
  modalbg.classList.toggle("bground--show");
}

// on submit form data verification
function submitForm(e) {
  e.preventDefault();
  console.log("submitForm");
}


