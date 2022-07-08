function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modal = document.querySelector(".bground");
const showModalBtn = document.querySelector(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");


// launch modal event
showModalBtn.addEventListener("click", toggleModal);
// close modal event
closeModalBtn.addEventListener('click', toggleModal)

// toggle modal form
function toggleModal() {
  modalbg.classList.toggle("bground--show");
}



