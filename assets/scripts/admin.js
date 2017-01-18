// Initialize Firebase
var config = {
  apiKey: "AIzaSyBA24m48rfJnoVj0W-qNmdxIdYT66DIFgQ",
  authDomain: "bc-18-maintenance-tracker.firebaseapp.com",
  databaseURL: "https://bc-18-maintenance-tracker.firebaseio.com",
  storageBucket: "bc-18-maintenance-tracker.appspot.com",
  messagingSenderId: "379983700309",
};

var fire = firebase.initializeApp(config);

// Get a reference to the database service
var database = fire.database();

function track() {
  const trackID = document.getElementById('trackID').value;
  document.getElementById('trackID').value = "";
  var plateNumber = document.createElement('p');
  plateNumber.setAttribute("id","plateNumber");
  plateNumber.innerHTML = trackID;
  alert('Tracking in progress: ' + trackID);
}

/* function regExTest(string) {
  var expression = (^[a-zA-Z0-9_.-]*$);
  return expression.test(string);
} */

function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href('/');
  }, function(error) {
    // An error happened.
    alert(error);
  });
}

function createAccount() {
  const email = document.getElementById('username');
  const password = document.getElementById('password');
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message);
    // ...
  });
}

function newMaintenanceRequest() {
  var engineNumber = document.getElementById('engineNumber').value;
  var trackID = document.getElementById('trackID').value;
  var carModel = document.getElementById('carModel').value;
  var damage = document.getElementById('damage').value;
  var contact = document.getElementById('contact').value;
  var ownerName = document.getElementById('name').value;

  var projectRef = fire.database().ref('/cars');
  console.log(projectRef);
  projectRef.push({
    "engine number": engineNumber,
    "track ID": trackID,
    "Car Model": carModel,
    "Damage" :  damage,
    "Car Owner Name" : ownerName,
    "Car Owner Mobile" : contact
  });

  document.getElementById('engineNumber').value = "";
  document.getElementById('trackID').value = "";
  document.getElementById('carModel').value = "";
  document.getElementById('damage').value = "";
  document.getElementById('contact').value = "";
  document.getElementById('name').value = "";

  projectRef.on("value", function(snapshot){
			console.log(snapshot.val());
		}, function (error) {
			console.log("Error: " +  error.code);
		});
}
