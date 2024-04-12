const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.cookie = "billyBob";
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
};
  
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (email && password) {
      const response = await fetch('/user', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.cookie = "billyBob";
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  
const path = window.location.pathname;
let className = 'defaultbg';

if (path === '/') {
    className = 'homebg';
} else if (path.includes('login')) {
    className = 'loginbg';
}

document.body.classList.add(className);


function checkSessionCookie() {
  const cookies = document.cookie.split(';');

  for (var i =0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.match('billyBob')){
          return true
      }
  }

  return false
}

if (checkSessionCookie()){
  SignUp();
} else {
  Login();
}

document
    .querySelector('#loginbtn')
    .addEventListener('click', SignUp);
document
    .querySelector('#signupbtn')
    .addEventListener('click', Login);

function SignUp () {
  const hideLogin = document.querySelector('#login');
  hideLogin.style.display = "block";
  const hideSignUp = document.querySelector('#signup');
  hideSignUp.style.display = "none";
  const showSignupBtn = document.querySelector('#signupbtn');
  showSignupBtn.style.display = "block";
  const showLoginBtn = document.querySelector('#loginbtn');
  showLoginBtn.style.display = "none";
}

function Login(){
  const hideSignUp = document.querySelector('#signup');
  hideSignUp.style.display = "block";
  const hideLogin = document.querySelector('#login');
  hideLogin.style.display = "none";
  const showLoginBtn = document.querySelector('#loginbtn');
  showLoginBtn.style.display = "block";
  const showSignupBtn = document.querySelector('#signupbtn');
  showSignupBtn.style.display = "none";
}