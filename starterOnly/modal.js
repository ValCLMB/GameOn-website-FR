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

// Form inputs
const first = document.querySelector('#first')
const last = document.querySelector('#last')
const email = document.querySelector('#email');
const birthdate = document.querySelector("#birthdate")
const quantity = document.querySelector('#quantity')
const locationRadios = document.querySelectorAll("input[type='radio']")
const conditionCheck = document.querySelector("#checkbox1");

// Regex
const numberRegex = /^[0-9]\d*$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const lengthRegex = /^.{2,}$/;
const dateRegex = /^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$/;

const errorMsg = [
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    "Veuillez saisir un email valide",
    "Vous devez entrer votre date de naissance.",
    "Veuillez saisir un nombre valide",
    "Vous devez choisir une option.",
    "Vous devez vérifier que vous acceptez les termes et conditions.",
]
const inputsCheck = [
    {input: first, regex: lengthRegex, error: errorMsg[0]},
    {input: last, regex: lengthRegex, error: errorMsg[0]},
    {input: email, regex: emailRegex, error: errorMsg[1]},
    {input: birthdate, regex: dateRegex, error: errorMsg[2]},
    {input: quantity, regex: numberRegex, error: errorMsg[3]},
    {input: locationRadios, error: errorMsg[4]},
    {input: conditionCheck, error: errorMsg[5]}
]


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

function checkInput(input, regex) {
    // If regex is not given, regex is null
    if (typeof regex === 'undefined') {
        regex = null
    }

    // If regex is given trim the value and test the value with regex
    if (regex) {
        const value = input.value.trim();
        return regex.test(value)
    }

    // If input is a NodeList(radios) return true if one of the radio is checked
    if (NodeList.prototype.isPrototypeOf(input)) {
        let checked = false;
        input.forEach(radio => {
            if (radio.checked) checked = true;
        })
        return checked;
    }

    // If input is checked return true
    return input.checked;

}

function validForm(form) {
    let valid = true;
    // If the input is valid set valid at true
    form.forEach(item => {
        checkInput(item.input, item.regex) ? item.valid = true : item.valid = false;
        // If one of the item is invalid the form is invalid, display error message (wip)
        if (!item.valid) {
            item.input.insertAdjacentHTML("afterend", `<div class="input-error">${item.error}</div>`)
            valid = false;
        }
    })
    return valid;
}

// on submit form data verification
function submitForm(e) {
    e.preventDefault();

    const form = e.target;
    const formValid = validForm(inputsCheck);

    // If the form is valid close the modal and clear the inputs values
    if (formValid) {
        toggleModal();
        Object.values(form).forEach(input => input.value = "")
        console.log("submit")
    } else {
        console.log("erreur")
    }

}


