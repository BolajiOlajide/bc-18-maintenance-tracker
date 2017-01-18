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
    "enginenumber": engineNumber,
    "trackID": trackID,
    "CarModel": carModel,
    "Damage" :  damage,
    "CarOwnerName" : ownerName,
    "CarOwnerMobile" : contact
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
    alert('Success!');
}

function createNewStaff() {
  var name = document.getElementById('name').value;
  var age = document.getElementById('age').value;
  var contactNo = document.getElementById('contactNo').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var specialty = document.getElementById('specialty').value;
  var dob = document.getElementById('dob').value;

  var projectRef = fire.database().ref('/staff');
  console.log(projectRef);
  projectRef.push({
    "name": name,
    "age": age,
    "dob": dob,
    "contactNo": contactNo,
    "email" : email,
    "password" : password,
    "specialty" : specialty
  });

  document.getElementById('name').value = "";
  document.getElementById('age').value = "";
  document.getElementById('dob').value = "";
  document.getElementById('contactNo').value = "";
  document.getElementById('email').value = "";
  document.getElementById('password').value = "";
  document.getElementById('specialty').value = "";

  projectRef.on("value", function(snapshot){
			//console.log(snapshot.val());
		}, function (error) {
			console.log("Error: " +  error.code);
		});
}

function viewLog() {
  var projectRef = fire.database().ref('/cars');

  projectRef.orderByKey().on("value", function(snapshot){
    var cars = [];
    snapshot.forEach(function(childSnapshot) {
        var car = childSnapshot.val();
        cars.push(car);
    });
    for (var i = 0;i < cars.length; i++) {
      var car = cars[i];
      var $row = $('<tr>'+
        '<td>'+ (i+1) +'</td>'+
        '<td>' + car.CarOwnerName + '</td>' +
        '<td>' + car.CarOwnerMobile + '</td>' +
        '<td>' + car.trackID + '</td>' +
        '<td>' + car.CarModel + '</td>' +
        '<td>' + car.enginenumber + '</td>' +
        '<td>' + car.Damage + '</td>' +
        '</tr>');

      $('table > tbody:last').append($row);
    }
	}, function (error) {
		console.log("Error: " +  error.code);
	});
}

function viewStaff() {
  var projectRef = fire.database().ref('/staff');

  projectRef.orderByKey().on("value", function(snapshot){
    var staffArray = [];
    snapshot.forEach(function(childSnapshot) {
        var staff = childSnapshot.val();
        staffArray.push(staff);
    });
    for (var i = 0;i < staffArray.length; i++) {
      var staff = staffArray[i];
      var $row = $('<tr>'+
        '<td>'+ (i+1) +'</td>'+
        '<td>' + staff.name + '</td>' +
        '<td>' + staff.age + '</td>' +
        '<td>' + staff.dob + '</td>' +
        '<td>' + staff.contactNo + '</td>' +
        '<td>' + staff.email + '</td>' +
        '<td>' + staff.specialty + '</td>' +
        '</tr>');

      $('table > tbody:last').append($row);
    }
	}, function (error) {
		console.log("Error: " +  error.code);
	});
}
