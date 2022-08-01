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
const first = document.querySelector('#first');
const last = document.querySelector('#last');
const email = document.querySelector('#email');
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector('#quantity');
const locationRadios = document.querySelectorAll("input[type='radio']");
const conditionCheck = document.querySelector("#checkbox1");

// Regex
const numberRegex = /^[0-9]\d*$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const lengthRegex = /^.{2,}$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const errorMsg = [
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    "Veuillez saisir un email valide",
    "Vous devez entrer votre date de naissance.",
    "Veuillez saisir un nombre valide",
    "Vous devez choisir une option.",
    "Vous devez acceptez les termes et conditions.",
];
const inputsCheck = [
    {input: first, regex: lengthRegex, error: errorMsg[0]},
    {input: last, regex: lengthRegex, error: errorMsg[0]},
    {input: email, regex: emailRegex, error: errorMsg[1]},
    {input: birthdate, regex: dateRegex, error: errorMsg[2]},
    {input: quantity, regex: numberRegex, error: errorMsg[3]},
    {input: locationRadios, error: errorMsg[4]},
    {input: conditionCheck, error: errorMsg[5]}
];


//EVENT LISTENERS

// launch modal event
showModalBtn.forEach(btn => btn.addEventListener("click", toggleModal));
// close modal event
closeModalBtn.addEventListener('click', toggleModal);
// onsubmit form event
form.addEventListener("submit", submitForm);


//FUNCTION

// toggle modal form
function toggleModal() {
    modalbg.classList.toggle("bground--show");
}

function checkInput(input, regex) {
    // If regex is given trim the value and test the value with regex
    if (!!regex) {
        const value = input.value.trim();
        return regex.test(value);
    }

    // If input is a NodeList(radios) return true if one of the radio is checked
    if (NodeList.prototype.isPrototypeOf(input)) {
        let checked = false;
        input.forEach(radio => {
            if (radio.checked) {
                checked = true;
                input.checked = radio.value;
            }
        })
        return checked;
    }

    // If input is checked return true
    return input.checked;
}

function validForm(form) {
    let valid = true;

    // If the input is invalid set valid to false
    form.forEach(item => {
        checkInput(item.input, item.regex) ? item.valid = true : item.valid = false;

        if (!item.valid) valid = false;
    })
    return valid;
}

function displayErrors(form) {
    let divBeforeError;
    form.forEach(item => {
        // Do not display error if its already displayed
        if (!item.valid && !item.errorDisplayed) {

            // If the input is a nodeList (radio check) inputBeforeError is the last radio, else is the input
            NodeList.prototype.isPrototypeOf(item.input) ? divBeforeError = item.input.item(item.input.length - 1) : divBeforeError = item.input;

            divBeforeError = divBeforeError.closest('.formData');

            // Display errors after the input div
            divBeforeError.insertAdjacentHTML("afterend", `<div class="input-error">${item.error}</div>`);
            item.errorDisplayed = true;

            deleteErrors(item, divBeforeError.nextSibling);
        }
    })
}


// Add an input listener who delete error message if the input is valid.
function deleteErrors(inputObject, errorDiv) {
    // If it's a NodeList
    if (NodeList.prototype.isPrototypeOf(inputObject.input)) {
        // On click on the radio button div call checkInput function, if return true delete error
        errorDiv.previousSibling.addEventListener('click', function () {
            if (checkInput(inputObject.input)) errorDiv.remove();
        })
    } else {
        // On input change if the input is valid remove the error
        inputObject.input.addEventListener('input', function () {
            if (checkInput(inputObject.input, inputObject.regex)) errorDiv.remove();

        })
    }
}

function displayValidation(msg) {

    // Create validation div
    document.querySelector(".modal-body")
        .insertAdjacentHTML("beforeend",
            `<div class="form-validate">
                    <p>${msg}</p>
                    <button class="button modal-btn">Fermer</button>
            </div>`)

    // event listener for close modal
    document.querySelector(".form-validate .modal-btn").addEventListener('click', toggleModal)
}

// on submit form data verification
function submitForm(e) {
    e.preventDefault();

    const form = e.target;
    const formValid = validForm(inputsCheck);
    const validationMsg = "Merci pour votre inscription";
    let returnValue = [];

    // If the form is valid close the modal and clear the inputs values
    if (formValid) {

        // Show input values in console
        formData.forEach(item => {
            // Normal input
            if (item.children.length === 2) {
                returnValue.push({name: item.children[1].id, value: item.children[1].value})
            } else if (item.children.length === 4) { // checkboxes
                item.querySelectorAll("input").forEach(checkbox => {
                    returnValue.push({name: checkbox.id, value: checkbox.checked})
                })
            } else { // radio
                item.querySelectorAll("input").forEach(radio => {
                    if (radio.checked) returnValue.push({name: "location", value: true})
                })
            }
        })
        console.log(returnValue)

        // Delete the form values
        Object.values(form).forEach(input => input.value = "");
        // Display the validation message
        displayValidation(validationMsg);

    } else {
        displayErrors(inputsCheck);
    }
}


