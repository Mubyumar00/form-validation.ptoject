// Input Fields
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');

// Form
const form = document.getElementById('myForm');

// Validation colors
const green = '#4CAF50';
const red = '#F44336';

// Validation functions
function validateFirstName() {
    // check if the first name is empty
    if(checkIfEmpty(firstName)) return;
    // check if the first name has only letters
    if (!checkIfOnlyLetters(firstName)) return;
    // if it is not the case,
    return true;
}

function validateLastName() {
    // check if the last name is empty
    if(checkIfEmpty(lastName)) return;
    // check if the last name has only letters
    if (!checkIfOnlyLetters(lastName)) return;
    // if it is not the case,
    return true;
}

function validatePassword() {
    // check if the password is empty
    if(checkIfEmpty(password)) return;
    // check if the password is a certain length characters long
    if (!meetLength(password, 4, 100)) return;
    // check password against our character requirements

    // at least one uppercase letter, one lowercase letter, one number, and one special character
    if (!containCharacters(password, 4)) return;
    return true;
    
}

function validateConfirmPassword() {
    
}

// Utility functions
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        // set the field invalid
        setInvalid(field, `${field.name} cannot be empty`);
        return true;
    } else {
        // set the field valid
        setValid(field);
        return false;
    }
}

function isEmpty(value) {
    if (value === '') return true;
    return false;
}

function setInvalid(field, message) {
    field.className = 'invalid';
    field.style.borderColor = red;
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}

function setValid(field) {
    field.className = 'valid';
    field.style.borderColor = green;
    field.nextElementSibling.innerHTML = '';
    // field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`);
        return false;
    }
}

function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        setValid(field);
        return true;
    } else if (field.value.length < minLength) {
        setInvalid(field, `${field.name} must be at least ${minLength} characters long`);
        return false;
    } else {
        setInvalid(field, `${field.name} must be less than ${maxLength} characters long`);
        return false;
    }
}

function containCharacters(field, code) {
    let regEx;
    switch (code) {
        case  1:
            // letters
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, `${field.name} must contain at least one letter`);
        case 2:
            // letters and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, `${field.name} must contain at least one letter and one number`);
        case 3:
            // Uppercase, lowercase and numbers
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(regEx, field, `${field.name} must contain at least one uppercase letter, one lowercase letter and one number`);
        case 4:
            // Uppercase, lowercase, numbers and special characters
            regEx = /(?=.*\d)(?=.*[a-z])(?=.[A-Z])(?=.*\W)/;
            return matchWithRegEx(regEx, field, `${field.name} must contain at least one uppercase letter, one lowercase letter, one number and one special character`);
    
        default:
            return false;
    }

}

function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}