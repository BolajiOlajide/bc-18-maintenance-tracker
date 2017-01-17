var express = require('express');
var bodyParser = require('body-parser');
var firebase = require('firebase');
var app = express();

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'),function() {
    console.log('Maintenance Tracker running. To terminate press Ctrl + C.');
});

app.get('/', function(req,res) {
  console.log(req.url);
    res.render('index');
    //res.send('Hey, Express Works!');
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

app.get('/contact', function(req,res) {
  console.log(req.url);
    res.render('contact');
    //res.send('Hey, Express Works!');
});

app.get('/admin', function(req,res) {
  console.log(req.url);
  res.render('admin');
});
