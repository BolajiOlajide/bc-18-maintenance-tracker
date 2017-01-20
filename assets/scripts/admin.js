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

//A function to load the track ID automatically when reporting a case
function onLoadTrackID() {
  var projectRef = fire.database().ref('/cars');

  projectRef.orderByKey().on("value", function(snapshot){
    var carArray = [];
    snapshot.forEach(function(childSnapshot) {
      var car = childSnapshot.val();
      carArray.push(car);
    });
    for (var i = 0;i < carArray.length; i++) {
      var car = carArray[i];
      $('#trackID').append('<option value=' + car.trackID +'> ' + car.trackID + '</option>');
    }
  }, function (error) {
    console.log("Error: " +  error.code);
  });
}

function track() { //a function to track items by their track ID (which is their plate number or serial number)
  var id = document.getElementById('trackID').value;
  var projectRef = fire.database().ref('/cars');

  projectRef.orderByKey().on("value", function(snapshot){
    var cars = [];
    snapshot.forEach(function(childSnapshot) {
      var car = childSnapshot.val();
      cars.push(car);
    });
    var carObject ={}
    for (var i = 0;i < cars.length; i++) {
      var car = cars[i];
      carObject[car.trackID] = cars[i];
    }
    if(id in carObject){
      var $row = $('<tr class="tables">'+
      '<td>' + carObject[id].trackID + '</td>' +
      '<td>' + carObject[id].CarModel + '</td>' +
      '<td>' + "Handler" + '</td>' +
      '<td>' + carObject[id].Damage + '</td>' +
      '<td>' + carObject[id].status + '</td>' +
      '</tr>');
      $('.tables').remove();
      $('table > tbody:last').append($row);
    } else {
      alert("Invalid ID");
    }
	}, function (error) {
		console.log("Error: " +  error.code);
	});
}

function signOut() { //function to sign out a current user from  his or her session
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    //window.location.href('/');
  }, function(error) {
    // An error happened.
    alert(error);
  });
}

/* function createAccount() {
  const email = document.getElementById('username');
  const password = document.getElementById('password');
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message);
    // ...
  });
} */

function createNewStaff() {
  var ref = new fire("https://bc-18-maintenance-tracker.firebaseio.com");

  var name = document.getElementById('name').value;
  var age = document.getElementById('age').value;
  var contactNo = document.getElementById('contactNo').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var specialty = document.getElementById('specialty').value;
  var dob = document.getElementById('dob').value;

  fire.createUser({
    email    : email,
    password : password
    }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });

  document.getElementById('name').value = "";
  document.getElementById('age').value = "";
  document.getElementById('dob').value = "";
  document.getElementById('contactNo').value = "";
  document.getElementById('email').value = "";
  document.getElementById('password').value = "";
  document.getElementById('specialty').value = "";
}

function newMaintenanceRequest() { //making a new maintenance request
  var engineNumber = document.getElementById('engineNumber').value;
  var trackID = document.getElementById('trackID').value;
  var carModel = document.getElementById('carModel').value;
  var damage = document.getElementById('damage').value;
  var contact = document.getElementById('contact').value;
  var ownerName = document.getElementById('name').value;

  if ((trackID == 0) || (ownerName == 0) || (contact == 0) || (carModel == 0)) {
    alert("One or more required fields is empty");
  } else {
    var projectRef = fire.database().ref('/cars');
    console.log(projectRef);
    projectRef.push({
      "enginenumber": engineNumber,
      "trackID": trackID,
      "CarModel": carModel,
      "Damage" :  damage,
      "CarOwnerName" : ownerName,
      "CarOwnerMobile" : contact,
      "status": "pending"
    });

    document.getElementById('engineNumber').value = "";
    document.getElementById('trackID').value = "";
    document.getElementById('carModel').value = "";
    document.getElementById('damage').value = "";
    document.getElementById('contact').value = "";
    document.getElementById('name').value = "";
  }

  projectRef.on("value", function(snapshot){
	   console.log(snapshot.val());
	}, function (error) {
		console.log("Error: " +  error.code);
	});
  alert('Success!');
}

/* function createNewStaff() {
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
} */

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
      var trackID = car.trackID;
      var $row = $('<tr>'+
        '<td>'+ (i+1) +'</td>'+
        '<td>' + car.CarOwnerName + '</td>' +
        '<td>' + car.CarOwnerMobile + '</td>' +
        '<td>' + car.trackID + '</td>' +
        '<td>' + car.CarModel + '</td>' +
        '<td>' + car.enginenumber + '</td>' +
        '<td>' + car.Damage + '</td>' +
        '<td>' + car.status + '</a> </td>' +
        '</tr>');
      $('.tables').remove();
      $('table > tbody:last').append($row);
    }
	}, function (error) {
		console.log("Error: " +  error.code);
	});
} //function to view the logs of maintenance request at any particular time

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
}  // a function to view the list of maintenance stuff currently employed

function getStaffOnLoad() {
  var projectRef = fire.database().ref('/staff');

  projectRef.orderByKey().on("value", function(snapshot){
    var staffArray = [];
    snapshot.forEach(function(childSnapshot) {
      var staff = childSnapshot.val();
      staffArray.push(staff);
    });
    for (var i = 0;i < staffArray.length; i++) {
      var staff = staffArray[i];
      $('.staffList').append('<option value=' + staff.name +'> ' + staff.name + '</option>');
    }
	}, function (error) {
		console.log("Error: " +  error.code);
	});
}  //a function to load all staff in a dropdown list button on page load

/* function approvereject() {
  var status = document.getElementById('status');
  var checkRow = document.getElementsByTagName('tr');

  if (checkRow.length > 1) {
    console.log(checkRow);
    if (status.value == "approve") {
      // A post entry.
      var postData = {
        author: username,
        body: body,
        title: title,
        starCount: 0,
      };

      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child('cars').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/cars/' + newPostKey] = postData;
      updates['/user-posts/' + uid + '/' + newPostKey] = postData;

      return firebase.database().ref().update(updates);
    } else {
      alert('Reject');
    }
  } else {
    alert('Please Select A Request');
  }
} //a function to approve or reject maintenance requests */

function trackIDForApproval() {
  var id = document.getElementById('trackID').value;
  var projectRef = fire.database().ref('/cars');

  projectRef.orderByKey().on("value", function(snapshot){
    var cars = [];
    snapshot.forEach(function(childSnapshot) {
      var car = childSnapshot.val();
      cars.push(car);
    });
    var carObject ={}
    for (var i = 0;i < cars.length; i++) {
      var car = cars[i];
      carObject[car.trackID] = cars[i];
    }
    if(id in carObject){
      var $row = $('<tr class="tables">'+
      '<td>' + carObject[id].trackID + '</td>' +
      '<td>' + carObject[id].CarModel + '</td>' +
      '<td>' + carObject[id].Damage + '</td>' +
      '</tr>');
      $('.tables').remove();
      $('table > tbody:last').append($row);
    } else {
      alert("Invalid ID");
    }
	}, function (error) {
		console.log("Error: " +  error.code);
	});
} //during approval get maintenance request details using its track ID
