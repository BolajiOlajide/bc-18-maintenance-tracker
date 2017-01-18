var username;
var password;

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function login(username,password) {
  username = document.getElementById('username').value;
  password = document.getElementById('password').value;

  console.log(username);
  console.log(password);

  if (validateEmail(username) && password.length >= 6) {
    fetch('/',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(function(response){
      if(response.ok) {
        //redirectToAdmin();
        //window.location.href = '/admin/:uid';
        alert('login success!!');
      } else {
        alert('login failed');
      }
    })
    .catch(function(error) {
      alert('Fetch API error');
    })
  }
  else {
    if (!validateEmail(username)) {
      alert('Email is incorrect');
    } else {
      alert('Password must be longer than 5 characters.')
    }
  }
}

/* function redirectToAdmin() {
  fetch('/admin', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type' : 'application/json'
    }
    })
} */
