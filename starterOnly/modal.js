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
form.addEventListener("submit", submitForm)


//FUNCTION

// toggle modal form
function toggleModal() {
    modalbg.classList.toggle("bground--show");
}

function checkLength(input, length) {
    const value = input.value;
    // If the input is not empty and the value is minimum 2, return true
    return value.trim().length > 0 && value.length >= length;
}

function checkEmail(input) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const email = input.value;

    // Return true if the email is valid, false if not
    if (email.match(emailRegex)) {
        return true
    } else {
        return false
    }
}

function checkNumber(input) {
    const number = input.value;

    // If the input is
    if (checkLength(input, 0) && parseInt(number)) {
        return true;
    } else {
        return false
    }
}

function radioChecked(radios) {
    let locationChecked = false;
    // Loop on array of radio, if one of them is checked return true, if not return false
    radios.forEach(radio => {
        if (radio.checked) locationChecked = true;
    })
    return locationChecked;
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


    // Loop in the object and assign the variable to DOM item according to input "name" attribute
    Object.values(form).forEach(input => {
        input.value.trim();
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

    // Return true if all the condition is respected, false if not
    const formValid = checkLength(first, 2) && checkLength(last, 2)
    && checkEmail(email) && checkNumber(quantity)
    && radioChecked(location) && checkbox.checked ? true : false;

    // If the form is valid close the modal and clear the inputs values
    if (formValid) {
        toggleModal();
        Object.values(form).forEach(input => input.value = "")

        console.log("submit")
    } else {
        console.log("erreur")
    }

}


