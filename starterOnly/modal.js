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
    // All form inputs
    let first;
    let last;
    let email;
    let quantity;
    let location = [];
    let checkbox;
    // Useful var for validation
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let locationChecked;

    // Loop in the object and assign the variable to DOM item according to input "name" attribute
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

  // If one the locations input is check locationCheck = true
  location.forEach(check => {
    if(check.checked) locationChecked = true;
  });

  // Return true if all the condition is respected, false if not
  const formValid = first.value.length >=2 && last.value.length >=2 && email.value.match(emailRegex) && parseInt(quantity.value) && locationChecked && checkbox.checked ? true : false;

  if(formValid) {
    console.log("submit")
  }



}


