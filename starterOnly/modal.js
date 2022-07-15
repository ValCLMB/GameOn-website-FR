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
    const form = e.target;
    let first;
    let last;
    let email;
    let quantity;
    let location = [];
    let checkbox;


    Object.values(form).forEach(input => {
        switch (input.name) {
            case "first" :
                first = input;
                break;
          case "last" :
            last = input;
            break;
          case "email" :
            email = input;
            break;
          case "quantity" :
            quantity = input;
            break;
          case "location" :
            location.push(input);
            break;
          case "checkbox1" :
            checkbox = input;
            break;
        }
    })
  
}


