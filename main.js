var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override');
var firebase = require('./firebasedb');


app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use('/assets', express.static('assets'));
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'),function() {
    console.log('Maintenance Tracker running. To terminate press Ctrl + C.');
});

app.get('/', function(req,res) {
  console.log(req.url);
    res.render('index');
    //res.send('Hey, Express Works!');
});



app.post('/', function(req,res) {
    const email = req.body.username;
    const password = req.body.password;

    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          //res.status(200).send({message: 'Login Success'});

          console.log('Success!');
          res.redirect('/admin');
            //app.get('/admin', function(req,res) {
              //console.log(req.url);
                //res.render('admin');
            //});
        })
        .catch(function(error){
          console.log(error);
          res.status(500).send({message: 'Login Failed'});
        });
});

app.get('/createAccount', function(req,res) {
  console.log(req.url);
    res.render('createAccount');
    //res.send('Hey, Express Works!');
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

app.get('/newMaintain', function(req,res) {
  console.log(req.url);
  res.render('newMaintain');
});

app.get('/newStaff', function(req,res) {
  console.log(req.url);
  res.render('newStaff');
});
