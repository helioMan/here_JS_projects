/**
1. get the elements first
    - form
    - username
    - email
    - password
    - password2
2. then add an eventListener, after filling the form you have got to click it
    - check if any element is empty or not
    - check input's length in username (set min max)
    - check input's length in password (set min max)
    - check email validity
    - check if password matches each other
3. now check if the entries in input are empty
    - pass all the elements together
    - if values are empty then call the error function
    - if all is well then call the success function
4. next is the error message display function
    - pass the input and the message
    - get the form space div
    - add error class to display the dark color around the box
    - now fetch the small display tag for the parent
    - now display text passed as the message
5. move to the success display message
    - pass input
    - fetch the parent for the input
    - add success class to parent's list for color change
6. coming to check the length of inputs
    - pass input and min max ranges
    - if input value length is less than minimum
        - then it is an error, display it
    - else if it is greater then maximum
        - then it is a success, display it
    - if all is fine then it definitely is success
7. check if the email is valid
    - get the regex expression
    - if after testing it, it is true
        - it is a success
    - else it is an error
8. check if the password's match
    - if input1's value is not equal to input2
        - it is an error
 */

// get the tags
const form_here = document.getElementById("form");
const username_here = document.getElementById("username");
const email_here = document.getElementById("email");
const password_here = document.getElementById("password");
const password2_here = document.getElementById("password2");

// display error
function displayErrorInSubmission(input, message_show) {
    const form_space = input.parentElement;
    form_space.className = 'form-space error';
    const small_msg = form_space.querySelector('small');
    small_msg.innerText = message_show;
}

// display success
function displaySuccessfulSubmission(input) {
    const form_space = input.parentElement;
    form_space.className = 'form-space success';
}

// email validation check here
function email_validity(email) {
    const regex_here = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regex_here.test(email.value)) {
        displaySuccessfulSubmission(email);
    } else {
        displayErrorInSubmission(email, 'Email is not valid here!');
    }
}


// handle the tags
function check_the_tags(input_arr) {
    input_arr.forEach((inpt) => {
        if (inpt.value.trim() === '') {
            displayErrorInSubmission(inpt, `${first_caps(inpt)} is needed.`);
        } else {
            displaySuccessfulSubmission(inpt);
        }
    });
}

// first letter capital
function first_caps(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// input length checks
function length_check(input, min, max) {
    if (input.value.length < min) {
        displayErrorInSubmission(input, `${first_caps(input)} should be minimum ${min} letters.`)
    } else if (input.value.length > max) {
        displayErrorInSubmission(input, `${first_caps(input)} should be maximum ${max} letters.`);
    }
    else {
        displaySuccessfulSubmission(input);
    }
}

// check passwords
function password_check_matching(input1, input2) {
    if (input1.value !== input2.value) {
        displayErrorInSubmission(input2, 'Passwords are not matching.')
    }
}

// add an event listener to the form submission
form_here.addEventListener("submit", (msg) => {
    msg.preventDefault();

    check_the_tags([username_here, email_here, password_here, password2_here]);
    length_check(username_here, 5, 20);
    length_check(password_here, 6, 19);
    email_validity(email);
    password_check_matching(password_here, password2_here);
})