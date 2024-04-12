// Asynchronous function to handle login form submissions
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieve and trim user inputs from login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both email and password fields are not empty
  if (email && password) {
    const response = await fetch('/user/login', {
      method: 'POST', // HTTP method for sending data
      body: JSON.stringify({ email, password }), // Convert object to JSON string
      headers: { 'Content-Type': 'application/json' }, // Set content type header
    });

    // Check server response status
    if (response.ok) {
      document.cookie = "billyBob"; // Set a cookie named "billyBob"
      document.location.replace('/'); // Redirect to homepage if login is successful
    } else {
      alert('Failed to log in.'); // Alert the user on login failure
    }
  }
};

// Asynchronous function to handle signup form submissions
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Retrieve and trim user inputs from signup form
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if both email and password fields are not empty
  if (email && password) {
    const response = await fetch('/user', {
      method: 'POST', // HTTP method for creating data
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check server response status
    if (response.ok) {
      document.cookie = "billyBob"; // Set a cookie named "billyBob"
      document.location.replace('/'); // Redirect to homepage if signup is successful
    } else {
      alert('Failed to sign up.'); // Alert the user on signup failure
    }
  }
};

// Attach event listeners to login and signup forms for handling submissions
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// Determine and apply the appropriate background class based on the current path
const path = window.location.pathname;
let className = 'defaultbg';
if (path === '/') {
  className = 'homebg';
} else if (path.includes('login')) {
  className = 'loginbg';
}
document.body.classList.add(className);

// Check if the "billyBob" cookie is present and decide whether to show login or signup page
function checkSessionCookie() {
const cookies = document.cookie.split(';');
for (var i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].trim();
  if (cookie.match('billyBob')) {
    return true;
  }
}
return false;
}

if (checkSessionCookie()){
SignUp();
} else {
Login();
}

// Toggle between showing login or signup forms based on user interaction
document.querySelector('#loginbtn').addEventListener('click', SignUp);
document.querySelector('#signupbtn').addEventListener('click', Login);

function SignUp () {
const hideLogin = document.querySelector('#login');
hideLogin.style.display = "block"; // Show login form
const hideSignUp = document.querySelector('#signup');
hideSignUp.style.display = "none"; // Hide signup form
const showSignupBtn = document.querySelector('#signupbtn');
showSignupBtn.style.display = "block"; // Show signup button
const showLoginBtn = document.querySelector('#loginbtn');
showLoginBtn.style.display = "none"; // Hide login button
}

function Login(){
const hideSignUp = document.querySelector('#signup');
hideSignUp.style.display = "block"; // Show signup form
const hideLogin = document.querySelector('#login');
hideLogin.style.display = "none"; // Hide login form
const showLoginBtn = document.querySelector('#loginbtn');
showLoginBtn.style.display = "block"; // Show login button
const showSignupBtn = document.querySelector('#signupbtn');
showSignupBtn.style.display = "none"; // Hide signup button
}