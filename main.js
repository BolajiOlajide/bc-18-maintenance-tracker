var express = require('express');
require('dotenv').config();

var app = express();
var methodOverride = require('method-override');
var firebase = require('./firebasedb');
var Jusibe = require('jusibe');
var jusibe = new Jusibe("b033fe3cf30d7873f208a767d26054c0", "4e07476fa37923e1980b51f05b94747b");
var bodyParser = require('body-parser');

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static('assets'));

app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),function() {
    console.log('Maintenance Tracker running. To terminate press Ctrl + C.');
});

app.get('/', function(req,res) {
  var current_user = firebase.auth().currentUser;
  console.log(current_user);
  if (current_user) {
    //var uid = current_user.uid;
    res.redirect('/admin');
  } else {
    res.render('index');
  }
});

app.post('/', function(req,res) {
  const email = req.body.username;
  const password = req.body.password;

  firebase.auth()
    .signInWithEmailAndPassword(email, password)
      .then(function(user) {
      console.log('accepted');
      res.redirect('/admin');
      console.log('Success!');
    })
    .catch(function(error){
      console.log(error);
      res.status(500).send({message: 'Login Failed'});
    });
});

app.get('/createAccount', function(req,res) {
  console.log(req.url);
  res.render('createAccount');
});

/* app.use(function(req, res) {
    res.status(404).render('404');
});

app.use(function(req, res) {
    res.status(500).send('500: Internal Server Error');
}); */

app.get('/admin', function(req,res) {
  console.log(req.url);
  res.render('admin');
});

app.get('/track', function(req,res) {
  console.log(req.url);
  res.render('track');
});

app.get('/report', function(req,res) {
  console.log(req.url);
  res.render('report');
});

app.post('/report', function(req,res) {
  console.log(req.url);
  var payload = {
    to: '+2347038550515',
    from: 'Maintenance Tracker',
    message: 'Hello From the other side 😎\nI must have called a thousand times.'
  };
  console.log(payload);
  jusibe.sendSMS(payload, function (err, res) {
    if (res.statusCode === 200) {
      console.log(res.body);
      //res.redirect('/admin');
    } else {
      console.log(err);
    }
  });
})

app.get('/newMaintain', function(req,res) {
  console.log(req.url);
  res.render('newMaintain');
});

app.get('/newStaff', function(req,res) {
  console.log(req.url);
  res.render('newStaff');
});

app.get('/maintainLog', function(req,res) {
  console.log(req.url);
  res.render('maintainLog');
});

app.get('/staff', function(req,res) {
  console.log(req.url);
  res.render('staff');
});

app.get('/approvereject', function(req,res) {
  console.log(req.url);
  res.render('approvereject');
});
