var firebase = require('firebase');
var process.env = require('dotenv').config();

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: process.env.API_KEY,                          //assigned my API key to an environment variable
  authDomain: "process.env.AUTH_DOMAIN",                //assigned my authentication domain key to an environment variable
  databaseURL: "process.env.DATABASE_URL",              //assigned my databse URL to an environment variable
  storageBucket: "process.env.STORAGE_BUCKET",          //assigned my storage bucket to an environment variable
  messagingSenderId: "process.env.MESSAGING_SENDER_ID", //assigned my sender ID to an environment variable
};

firebase.initializeApp(config); //initialize firebase with the configuration defined above
module.exports = firebase; //export the firebase module so it can be called when required
